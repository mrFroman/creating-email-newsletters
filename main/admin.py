from django.contrib import admin

from .models import User, UrlsContent, CityMailSend, DateMailSend

admin.site.register(User)
admin.site.register(CityMailSend)
admin.site.register(DateMailSend)
admin.site.register(UrlsContent)



