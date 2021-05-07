from django.urls import path
from .api import (get_posts, add_post, tweet_action, tweet_datails, remove_post, get_tag_posts, get_tags, clear_bookmarks, visit_profile,
                  get_notifications, read_notification, get_bookmarks,
                  )

urlpatterns = [
    path("api/posts/<str:type>/", get_posts),
    path("api/post", add_post),
    path("api/deletepost", remove_post),
    path("api/action", tweet_action),
    path("api/post/<int:id>", tweet_datails),
    path("api/tag/<str:tag>", get_tag_posts),
    path("api/tags", get_tags),
    path("api/bookmarks", clear_bookmarks),
    path("api/allbookmarks", get_bookmarks),
    path("api/profile/<str:username>", visit_profile),
    path("api/notifications", get_notifications),
    path("api/notifications/read", read_notification),
]
