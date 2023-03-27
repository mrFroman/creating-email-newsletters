from rest_framework import serializers


class DateUrl(object):
    def __init__(self, json_data):
        self.json_data = json_data


class UrlSerializer(serializers.Serializer):
    json_data = serializers.JSONField()



