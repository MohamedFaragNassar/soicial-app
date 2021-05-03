from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from .models import Post
from .serializers import PostSerializer

# Create your views here.


class index(generics.ListAPIView):
    def get(self, request, format=None):
        return JsonResponse({'Name': 'mfnemo'})


class PostView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
