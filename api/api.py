from django.contrib.auth.models import User
import logging
from django.http.response import Http404, HttpResponseNotFound
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.status import HTTP_500_INTERNAL_SERVER_ERROR,HTTP_404_NOT_FOUND
from rest_framework.decorators import api_view, permission_classes, parser_classes 
from .serializers import PostSelializer, CreatePostSerializer, TweetActionSelializer, TagSerializer, NotificationSerializer
from .models import Tweet, Tag, Notification
from accounts.models import Profile
from accounts.serializers import ProfileSerializer
from rest_framework.exceptions import PermissionDenied
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import MultiPartParser, FormParser
import json

logger = logging.getLogger(__name__)

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_posts(request, type):
    if(type == "mytweets"):
        myposts = Tweet.objects.filter(
            user__username=request.user,parent=None).order_by("-createdAt")
        sharedposts = Tweet.objects.filter(
            shares=request.user,parent=None).order_by("-createdAt")
        posts = myposts | sharedposts
    else:
        profile = Profile.objects.get(user=request.user)
        following_users = profile.following.values_list("id", flat=True)
        following_posts = Tweet.objects.filter(user__id__in=following_users,parent=None).order_by("-createdAt")
        myposts = Tweet.objects.filter(
            user__username=request.user, parent=None).order_by("-createdAt")
        posts = myposts | following_posts
    
    paginator = PageNumberPagination()
    page = paginator.paginate_queryset(posts, request)
    serializer = PostSelializer(page, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_liked_posts(request):
    posts = Tweet.objects.filter(likes=request.user,parent=None).order_by("-createdAt")
    paginator = PageNumberPagination()  
    page = paginator.paginate_queryset(posts, request)
    serializer = PostSelializer(page, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_liked_posts(request,username):
    user = User.objects.get(username=username)
    posts = Tweet.objects.filter(likes=user,parent=None).order_by("-createdAt")
    paginator = PageNumberPagination()  
    page = paginator.paginate_queryset(posts, request)
    serializer = PostSelializer(page, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_posts(request,username):
    user = User.objects.get(username=username)
    myposts = Tweet.objects.filter(
            user__username=username,parent=None).order_by("-createdAt")
    sharedposts = Tweet.objects.filter(
        shares=user,parent=None).order_by("-createdAt")
    posts = myposts | sharedposts
    paginator = PageNumberPagination()  
    page = paginator.paginate_queryset(posts, request)
    serializer = PostSelializer(page, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([IsAuthenticated])
def add_post(request):
    tag_objs = []

    #logger.error(request.data["tags"])
    for tag in json.loads(request.data["tags"]):
        tag_obj = Tag.objects.get_or_create(name=tag)
        tag_objs.append(tag_obj[0].id)
    
    if("image" in request.data.keys()):
        if("parent" in request.data.keys()):
            post = CreatePostSerializer(data={"content":request.data["content"],"parent":request.data["parent"],
                                "image":request.data["image"],"tags":tag_objs})
        else:
            post = CreatePostSerializer(data={"content":request.data["content"],
                                "image":request.data["image"],"tags":tag_objs})
    else:
        if("parent" in request.data.keys()):
            post = CreatePostSerializer(data={"content":request.data["content"],"type":request.data["type"],
                                        "parent":request.data["parent"],"tags":tag_objs})
        else:
            post = CreatePostSerializer(data={"content":request.data["content"],"type":request.data["type"],
                                        "tags":tag_objs}) 
    
    post.is_valid(raise_exception=True)
    post.save(user=request.user)

    new_post = Tweet.objects.get(id=post.data["id"])
    serializer = PostSelializer(new_post)

    if (request.data["type"] == "reply"):
        tweet_obj = Tweet.objects.get(id=request.data["parent"])
        if(request.user != tweet_obj.user):
            Notification.objects.create(
                owner=tweet_obj.user, user=request.user, parent=tweet_obj, action="replied to")
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def remove_post(request):
    tweetID = request.data["id"]
    Tweet.objects.filter(id=tweetID).delete()
    return Response({"success": True})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def tweet_datails(request, id):
    try:
        tweet_obj = Tweet.objects.get(id=id)
        serializer = PostSelializer(tweet_obj)
        return Response(serializer.data)
    except:
        return HttpResponseNotFound()

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_tags(request):
    tags = Tag.objects.all()
    serializer = TagSerializer(tags, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_tag_posts(request, tag):
    profile = Profile.objects.get(user=request.user)
    posts = Tweet.objects.filter(tags__name=tag).exclude(user__in = profile.blocks.all())
    serializer = PostSelializer(posts, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def tweet_action(request, *args, **kwargs):
    serializer = TweetActionSelializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    data = serializer.validated_data
    tweetID = data.get("id")
    action = data.get("action")
    tweet_obj = Tweet.objects.get(id=tweetID)
  
    if(action == "like"):
        tweet_obj.likes.add(request.user)
        if(request.user != tweet_obj.user):
            Notification.objects.create(
                owner=tweet_obj.user, user=request.user, parent=tweet_obj, action="liked")
        return Response({"success": True})

    elif(action == "unlike"):
        tweet_obj.likes.remove(request.user)
        return Response({"success": True})

    elif(action == "share"):
        tweet_obj.shares.add(request.user)
        if(request.user != tweet_obj.user):
            Notification.objects.create(
                owner=tweet_obj.user, user=request.user, parent=tweet_obj, action="shared")
        return Response({"success": True})

    elif(action == "unshare"):
        tweet_obj.shares.remove(request.user)
        return Response({"success": True})

    elif(action == "bookmark"):
        profile = Profile.objects.get(user=request.user)
        profile.bookmarks.add(tweetID)
        return Response({"success": True})

    elif(action == "unbookmark"):
        profile = Profile.objects.get(user=request.user)
        profile.bookmarks.remove(tweetID)
        return Response({"success": True})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_bookmarks(request):
    profile = Profile.objects.get(user=request.user)
    posts = profile.bookmarks.all().order_by("-createdAt")
    serializer = PostSelializer(posts, many=True)
    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def clear_bookmarks(request):
    profile = Profile.objects.get(user=request.user)
    profile.bookmarks.clear()
    return Response({"success": True})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def visit_profile(request, username):
    profile = Profile.objects.get(user__username=username)
    myProfile = Profile.objects.get(user=request.user)
    check_block = myProfile.blocks.filter(id=profile.user.id).count() > 0
    logger.error(check_block)
    if check_block:
        raise PermissionDenied("You are not permitted to see this page")

    else:
        profile_obj = ProfileSerializer(profile)
        is_follower = False

        for user in profile_obj.data["followers"]:
            if user["username"] == request.user.username:
                is_follower = True

        if profile_obj.data["is_private"] and (not is_follower):
            posts = []
        else:
            posts_objs = Tweet.objects.filter(user__username=username)
            # sharedposts = Tweet.objects.filter(shares=username)
            # all_posts = posts | sharedposts
            post_serializer = PostSelializer(posts_objs, many=True)
            posts = post_serializer.data
        return Response({
            "userProfile": profile_obj.data,
            "posts": posts
        })


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_notifications(request):
    notifications = Notification.objects.filter(
        owner=request.user).order_by('-id')
    serializer = NotificationSerializer(notifications, many=True)
    return Response(serializer.data)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def read_notification(request):
    if request.data["action"] == "all":
        Notification.objects.filter(owner=request.user).update(is_read=True)
    else:
        notification = Notification.objects.get(id=request.data["id"])
        notification.is_read = True
        notification.save()

    return Response({"success": True})
