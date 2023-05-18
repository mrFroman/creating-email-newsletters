from rest_framework import serializers
from .models import UrlsContent, DateMailSend, CityMailSend, User


class UrlsContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = UrlsContent
        fields = '__all__'


class CityMailSendtSerializer(serializers.ModelSerializer):
    class Meta:
        model = CityMailSend
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email')


class DateMailSendSerializer(serializers.ModelSerializer):
    class Meta:
        model = DateMailSend
        fields = '__all__'
