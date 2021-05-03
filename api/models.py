from django.db import models
from django.contrib.auth.models import User
import logging
import time
# Create your models here.
logger = logging.getLogger(__name__)


def image_name(instance, filename):
    logger.error(instance)
    return 'posts/{filename}{ts}.jpg'.format(filename=filename.split(".")[0],ts=time.time())


class Notification(models.Model):
    owner = models.ForeignKey(
        User, related_name="notification_owner", on_delete=models.CASCADE)
    user = models.ForeignKey(
        User, related_name="notification_user", on_delete=models.CASCADE)
    action = models.CharField(max_length=50)
    parent = models.ForeignKey(
        "Tweet", null=True, on_delete=models.SET_NULL)
    is_read = models.BooleanField(default=False)
    createdAt = models.DateField(auto_now_add=True)


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.ForeignKey("Tweet", on_delete=models.CASCADE)
    timeStamps = models.DateField(auto_now_add=True)


class Share(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.ForeignKey("Tweet", on_delete=models.CASCADE)
    timeStamps = models.DateField(auto_now_add=True)


class Tag(models.Model):
    name = models.CharField(max_length=100)
    createdAt = models.DateField(auto_now_add=True)


class Tweet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(max_length=250)
    image = models.ImageField(upload_to=image_name,null=True, blank=True)
    likes = models.ManyToManyField(
        User, related_name="tweet_like", blank=True, through=Like)
    shares = models.ManyToManyField(
        User, related_name="tweet_share", blank=True, through=Share)
    createdAt = models.DateField(auto_now_add=True)
    tags = models.ManyToManyField(Tag, related_name="tweet_tag", blank=True)
    parent = models.ForeignKey("self", null=True,  blank=True,on_delete=models.CASCADE)

    @property
    def is_retweet(self):
        return self.parent != None
