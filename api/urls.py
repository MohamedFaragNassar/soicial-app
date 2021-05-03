from django.urls import path
from .api import (get_posts, add_post, tweet_action, tweet_datails, remove_post, get_tag_posts, get_tags, clear_bookmarks, visit_profile,
                  get_notifications, read_notification, get_bookmarks,
                  )

urlpatterns = [
    path("posts/<str:type>/", get_posts),
    path("post", add_post),
    path("deletepost", remove_post),
    path("action", tweet_action),
    path("post/<int:id>", tweet_datails),
    path("tag/<str:tag>", get_tag_posts),
    path("tags", get_tags),
    path("bookmarks", clear_bookmarks),
    path("allbookmarks", get_bookmarks),
    path("profile/<str:username>", visit_profile),
    path("notifications", get_notifications),
    path("notifications/read", read_notification),
]
