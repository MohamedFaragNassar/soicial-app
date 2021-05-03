from django.urls import path, include
from .api import (Register, Login, profileDetials, Users, UpdateProfile, upload_personal_image, relation, change_privacy,
                  change_password, update_info, get_blocks, search_users, suggest_users,upload_cover_image,get_follow_notifications,
                  read_notification)


urlpatterns = [
    path('register', Register.as_view()),
    path('login', Login.as_view()),
    path("profile", profileDetials),
    path("users", Users.as_view({'get': 'list'})),
    path("update", UpdateProfile.as_view()),
    path("uploadpersonal", upload_personal_image),
    path("uploadcover", upload_cover_image),
    path("relation", relation),
    path("privacy", change_privacy),
    path("changepassword", change_password),
    path("updateinfo", update_info),
    path("getblocks", get_blocks),
    path("search/<str:keyword>", search_users),
    path("suggest", suggest_users),
    path("notifications", get_follow_notifications),
    path("notifications/read", read_notification),

]
