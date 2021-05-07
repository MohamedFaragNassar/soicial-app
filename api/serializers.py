from rest_framework import serializers
from .models import Tweet, Like, Share, Tag, Notification
from accounts.serializers import ProfileSerializer, UserSerializer,ProfileDataSerializer
from django.conf import settings
from accounts.models import Profile
import logging

logger = logging.getLogger(__name__)
TWEET_ACTIONS = settings.TWEET_ACTIONS


class NotificationSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = ["user", "parent", "id",
                  "action", "createdAt", "is_read"]

    def get_user(self, notification):
        profile = Profile.objects.get(user=notification.user)
        serializer = ProfileSerializer(profile)
        return serializer.data


class TagSerializer(serializers.ModelSerializer):
    count = serializers.SerializerMethodField()

    class Meta:
        model = Tag
        fields = ["name", "count"]

    def get_count(self, tag):
        return Tweet.objects.filter(tags__name=tag.name).count()


class CreatePostSerializer(serializers.ModelSerializer):
    user = ProfileSerializer(source='user.profile', read_only=True)
    image = serializers.ImageField(required=False)
    class Meta:
        model = Tweet
        fields = ['user', 'id', 'content', 'createdAt', "tags", "parent","image"]


class PostSelializer(serializers.ModelSerializer):
    user = ProfileSerializer(source='user.profile', read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)
    shares = serializers.SerializerMethodField(read_only=True)
    tags = serializers.SerializerMethodField()
    replies = serializers.SerializerMethodField()
    image = serializers.CharField(max_length=250)
    class Meta:
        model = Tweet
        fields = ["id", "content", "user","image","parent",
                  "createdAt", "likes", "shares", "tags", "replies"]

    def get_likes(self, post_obj):
        likes = post_obj.likes.values()
        serializer = UserSerializer(likes, many=True)
        return serializer.data

    def get_shares(self, post_obj):
        shares = post_obj.shares.values()
        serializer = UserSerializer(shares, many=True)
        return serializer.data

    def get_tags(self, post_obj):
        return post_obj.tags.values_list('name', flat=True)

    def get_replies(self, post_obj):
        replies = Tweet.objects.filter(parent=post_obj.id)
        serializer = PostSelializer(replies, many=True)
        return serializer.data
    
    


class TweetActionSelializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()

    def validate_action(self, value):
        value = value.lower().strip()
        if not value in TWEET_ACTIONS:
            raise serializers.ValidationError(
                "This is not a valid action for tweets")
        return value
