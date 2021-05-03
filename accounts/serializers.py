from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import FollowNotification, Profile
import logging


logger = logging.getLogger(__name__)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', "first_name",
                  "last_name", "date_joined")


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', "first_name", "last_name",
                  'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)

        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class ProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.SerializerMethodField(read_only=True)
    last_name = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)
    email = serializers.SerializerMethodField(read_only=True)
    date_joined = serializers.SerializerMethodField(read_only=True)
    id = serializers.SerializerMethodField(read_only=True)
    followers = serializers.SerializerMethodField(read_only=True)
    following = serializers.SerializerMethodField(read_only=True)
    personal_image = serializers.CharField(max_length=250)
    cover_image = serializers.CharField(max_length=250)
    class Meta:
        model = Profile
        fields = [
            "first_name",
            "last_name",
            "id",
            "bio",
            "location",
            "website",
            "username",
            "email",
            "date_joined",
            "personal_image",
            "cover_image",
            "birthday",
            "followers",
            "following",
            "bookmarks",
            "public_messages",
            "is_private",
            "gender",
            "blocks",
            "follow_requests"
        ]

    def get_first_name(self, profile):
        return profile.user.first_name

    def get_last_name(self, profile):
        return profile.user.last_name

    def get_username(self, profile):
        return profile.user.username

    def get_email(self, profile):
        return profile.user.email

    def get_id(self, profile):
        return profile.user.id

    def get_date_joined(self, profile):
        return profile.user.date_joined

    def get_following(self, profile):
        following = profile.following.values()
        serializer = UserSerializer(following, many=True)
        return serializer.data

    def get_followers(self, profile):
        followers = profile.followers.values()
        serializer = UserSerializer(followers, many=True)
        return serializer.data


class FollowNotificationSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    
    class Meta:
        model = FollowNotification
        fields = ["user", "id",
                  "action", "createdAt", "is_read"]

    def get_user(self, notification):
        profile = Profile.objects.get(user=notification.user)
        serializer = ProfileSerializer(profile)
        return serializer.data
