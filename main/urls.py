from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views

app_name = 'main'
urlpatterns = [
        path('', views.Index.as_view(), name='index'),
        path('login', views.LoginUser.as_view(), name='login'),
        path('logout', views.LogoutUser.as_view(), name='logout'),
        path('register', views.RegisterUser.as_view(), name='register'),
        path('new_date', views.CreateMail.as_view(), name='new_date'),

]


if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
