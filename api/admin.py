from django.contrib import admin
from .models import Notification,Like,Share,Tag,Tweet

admin.site.register(Notification)
admin.site.register(Like)
admin.site.register(Share)
admin.site.register(Tag)
admin.site.register(Tweet)
# Register your models here.
