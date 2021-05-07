from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from api.models import Tweet
import time
import logging

logger = logging.getLogger(__name__)

def personal_image_name(instance, filename):
    logger.error(instance)
    return 'personalImages/{filename}.jpg'.format(filename=instance.id)

def cover_image_name(instance, filename):
    return 'coverImages/{filename}.jpg'.format(filename=instance.id)


class FollowNotification(models.Model):
    owner = models.ForeignKey(
        User, related_name="follow_notification_owner", on_delete=models.CASCADE)
    user = models.ForeignKey(
        User, related_name="follow_notification_user", on_delete=models.CASCADE)
    action = models.CharField(max_length=50)
    is_read = models.BooleanField(default=False)
    createdAt = models.DateField(auto_now_add=True)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    birthday = models.DateTimeField(auto_now_add=True)
    bio = models.TextField(null=True, blank=True)
    website = models.CharField(null=True, blank=True,max_length=220)
    location = models.CharField(null=True,blank=True, max_length=220)
    personal_image = models.ImageField(upload_to = personal_image_name,
    default="/media/personalImages/account_yvnwmh.png" ,null=True,blank=True)
    cover_image = models.ImageField(upload_to = cover_image_name, null=True,blank=True,default="/media/coverImages/cover_yxdgi3.jpg")
    followers = models.ManyToManyField(
        User, related_name="followers", blank=True)
    following = models.ManyToManyField(
        User, related_name="following", blank=True)
    is_private = models.BooleanField(default=False)
    public_messages = models.BooleanField(default=False)
    blocks = models.ManyToManyField(
        User, related_name="blocked_accounts", blank=True)
    bookmarks = models.ManyToManyField(Tweet, blank=True)
    gender = models.CharField(max_length=50, null=True,blank=True)
    follow_requests = models.ManyToManyField(
        User, related_name="follow_requests", blank=True)

def user_did_save(sender, instance, created, *args, **kwargs):
    if created:
        Profile.objects.get_or_create(user=instance)


post_save.connect(user_did_save, sender=User)
