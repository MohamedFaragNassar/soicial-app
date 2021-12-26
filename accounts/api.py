from typing import List
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.status import HTTP_500_INTERNAL_SERVER_ERROR, HTTP_400_BAD_REQUEST
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer, ProfileSerializer,FollowNotificationSerializer
from django.contrib.auth.hashers import check_password, make_password
from django.contrib.auth.models import User
import logging
from .models import Profile, FollowNotification
from django.contrib.auth.models import User


logger = logging.getLogger(__name__)


class Register(ObtainAuthToken):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            "user": {
                'id': user.id,
                'email': user.email,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
            }
        })


class Login(ObtainAuthToken):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token.key
        })



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profileDetials(request):
        profile = Profile.objects.get(
            user__username=request.user)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)


class UpdateProfile(generics.UpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        user = request.user
        data = request.data
        profile_obj = Profile.objects.filter(user__username=user)

        try:
            if(data["first_name"]):
                user.first_name = data["first_name"]
            if(data["last_name"]):
                user.last_name = data["last_name"]
            if(data["bio"]):
                Profile.objects.filter(
                    user__username=user).update(bio=data["bio"])
            if(data["location"]):
                Profile.objects.filter(user__username=user).update(
                    location=data["location"])
            if(data["website"]):
                Profile.objects.filter(user__username=user).update(
                    website=data["website"])

        except:
            return HTTP_500_INTERNAL_SERVER_ERROR
        finally:
            user.save()
            return Response({"success": True})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def upload_personal_image(request):
    profile = Profile.objects.get(user__username=request.user)
    profile.personal_image = request.FILES["personal_image"]
    profile.save()
    return Response({"success":True})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def upload_cover_image(request):
    profile = Profile.objects.get(user__username=request.user)
    profile.cover_image = request.FILES["cover_image"]
    profile.save()
    return Response({"success":True})


class Users(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    # authentication_classes = [IsAuthenticated]

    def get_queryset(self):
        profile = User.objects.all()
        return profile


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def relation(request):
    sender_profil = Profile.objects.filter(user__username=request.user).first()
    sender_user = User.objects.filter(username=request.user).first()

    other_profile = Profile.objects.filter(
        user__username=request.data["username"]).first()

    other_user = User.objects.filter(username=request.data["username"]).first()

    action = request.data["action"]

    if (action == "follow"):
        if(other_profile.is_private):
            other_profile.follow_requests.add(sender_user)
            FollowNotification.objects.create(owner=other_user,user=sender_user,action="request")
        else:
            sender_profil.following.add(other_user)
            other_profile.followers.add(sender_user)
            FollowNotification.objects.filter(owner=other_user,user=sender_user,action="follow")
    elif(action == "accept"):
        other_profile.following.add(sender_user)
        sender_profil.followers.add(other_user)
        sender_profil.follow_requests.remove(other_user)
        FollowNotification.objects.create(owner=other_user,user=sender_user,action="accept")
        FollowNotification.objects.filter(owner=sender_user,user=other_user,action="request").delete()

    elif(action == "reject"):
        sender_profil.follow_requests.remove(other_user)
        FollowNotification.objects.filter(owner=sender_user,user=other_user,action="request").delete()
    elif(action == "cancel"):
        other_profile.follow_requests.remove(sender_user)
        FollowNotification.objects.filter(owner=other_user,user=sender_user,action="request").delete()
    elif(action == "unfollow"):
        sender_profil.following.remove(other_user)
        other_profile.followers.remove(sender_user)
    elif(action == "block"):
        sender_profil.blocks.add(other_user)
        sender_profil.following.remove(other_user)
    elif(action == "unblock"):
        sender_profil.blocks.remove(other_user)
    else:
        pass

    return Response({"success": True})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def change_privacy(request):
    profile = Profile.objects.get(user__username=request.user)
    action = request.data["action"]
    logger.error(action)
    if(action == "private"):
        profile.is_private = request.data["is_private"]
        profile.save()
    elif(action == "messages"):
        profile.public_messages = request.data["public_messages"]
        profile.save()

    return Response({"success": True})


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = User.objects.get(username=request.user)
    checkPassword = check_password(
        request.data["current"], request.user.password)
    if checkPassword:
        user.password = make_password(request.data["password"])
        user.save()
        serializer = UserSerializer(user)
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            "success": True,
            "user": serializer.data,
            "token": token.key
        })
    else:
        raise AuthenticationFailed("incorrect password")


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_info(request):
    action = request.data["action"]
    if(action == "email"):
        User.objects.filter(username = request.user.username).update(email = request.data["email"])
    elif(action=="username"):
        User.objects.filter(username = request.user.username).update(username = request.data["username"])
    elif(action=="gender"):
        Profile.objects.filter(user__username = request.user.username).update(gender = request.data["gender"])
        
    user = User.objects.get(id = request.user.id)
    serializer = UserSerializer(user)
    token, created = Token.objects.get_or_create(user=user)
    return Response({
        "user": serializer.data,
        "token": token.key
    })



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_blocks(request):
    profile = Profile.objects.get(user=request.user)
    blocks = profile.blocks.all()
    serializer = UserSerializer(blocks, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def search_users(request, keyword):
    users = User.objects.filter(username__contains=keyword).exclude(id = request.user.id)
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def suggest_users(request):
    my_profile = Profile.objects.get(user=request.user)
    my_following = my_profile.following.all()
    blocks = my_profile.blocks.all()
    suggests = []
    for usr in my_following :
        #logger.error(usr.following.exclude(id = request.user.id))
        suggests.extend((list(usr.followers.exclude(id__in = my_following).exclude(id = request.user.id)
                                            .exclude(id__in = blocks))))
    if(len(suggests) < 10):
        suggests.extend(list(Profile.objects.filter().exclude(id__in = my_following).exclude(id__in = blocks)
        .exclude(id = request.user.id)[:10]))
    serializer = ProfileSerializer(set(suggests),many=True)
    return Response(serializer.data)



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_follow_notifications(request):
    notifications = FollowNotification.objects.filter(
        owner=request.user).order_by("-createdAt")
    serializer = FollowNotificationSerializer(notifications, many=True)
    return Response(serializer.data)

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def read_notification(request):
    if request.data["action"] == "all":
        FollowNotification.objects.filter(owner=request.user).update(is_read=True)
    else:
        notification = FollowNotification.objects.get(id=request.data["id"])
        notification.is_read = True
        notification.save()

    return Response({"success": True})
