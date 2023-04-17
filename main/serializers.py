from rest_framework import serializers
from .models import UrlsContent, UrlsPoster


class ContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = UrlsContent
        fields = "__all__"


class UrlSerializer(serializers.ModelSerializer):
    class Meta:
        model = UrlsPoster
        fields = 'poster_url'
