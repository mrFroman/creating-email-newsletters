from rest_framework import serializers
from .models import UrlsContent, DateMailSend, CityMailSend, User


class UrlsContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = UrlsContent
        fields = ('date_create', 'poster_url', 'name_event', 'rate', 'date_event', 'time_event', 'venue', 'price',
                  'content_text')


class CityMailSendSerializer(serializers.ModelSerializer):
    class Meta:
        model = CityMailSend
        fields = ('id', 'city')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email')


class DateMailSendSerializer(serializers.ModelSerializer):
    city = CityMailSendSerializer(read_only=True)

    class Meta:
        model = DateMailSend
        fields = ('city', 'date_create')


#######################################################################################
class AllUrlSerializer(serializers.ModelSerializer):
    url_date = DateMailSendSerializer(many=True, read_only=True)

    class Meta:
        model = UrlsContent
        fields = '__all__'
        depth = 1




################## работает но криво ##############################
# class AllUrlSerializer(serializers.ModelSerializer):
#     url_date = DateMailSendSerializer(many=True, read_only=True)
#
#     class Meta:
#         model = UrlsContent
#         fields = '__all__'
#         depth = 1