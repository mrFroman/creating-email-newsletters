
from django.urls import path
from . import views

urlpatterns = [
        path('v1/urllist/', views.UrlAPIViews.as_view()),
        path('v1/citylist/', views.CityAPIViews.as_view()),
        path('v1/userlist/', views.UserAPIViews.as_view()),
        path('v1/datelist/', views.DateAPIViews.as_view()),
        path('v2/alllist/', views.AllUrlsView.as_view()),
]
