
import logging
from django.contrib.auth.views import LoginView, LogoutView
from django.shortcuts import reverse
from django.urls import reverse_lazy
from django.views.generic import CreateView, ListView, TemplateView
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import UrlsContent, Mainindex, CityMailSend, User, DateMailSend
from .form import LoginUserForm, RegisterUserForm
from .services import created_mailing_list
from rest_framework import generics, status, viewsets

from .serializers import UrlsContentSerializer, CityMailSendSerializer, UserSerializer, DateMailSendSerializer, \
    AllUrlSerializer

logger = logging.getLogger(__name__)

''' класс входа по логину '''


class LoginUser(LoginView):
    form_class = LoginUserForm
    template_name = 'main/login.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Авторизация'
        return context

    def get_success_url(self):
        return reverse('main:index')


class LogoutUser(LogoutView):
    next_page = reverse_lazy('main:index')


''' класс регистрации на сайте '''


class RegisterUser(CreateView):
    form_class = RegisterUserForm
    template_name = 'main/register.html'
    success_url = reverse_lazy('main:login')

    def get_context_date(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Регистрация'
        return context


''' класс выбора рассылки '''

''' сделать вид для главной страницы '''
class Index(ListView):
    model = Mainindex
    template_name = 'main/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Шаблонизатор'
        return context

    # def post(self, *args, **kwargs):
    #     context = {
    #         'formset_poster': self.formset_poster
    #     }
    #
    #     formset_poster = self.PosterFormset(data=self.request.POST)
    #
    #     if formset_poster.is_valid():
    #         content = formset_poster.cleaned_data
    #         with open('json_url.json', 'w', encoding='utf-8') as file:
    #             json.dump(content, file, indent=4)
    #         return redirect(reverse_lazy('main:new_date'))
    #     return self.render_to_response(context)


''' класс ввода ссылок и сборка афиши '''


class CreateMail(TemplateView):
    template_name = 'main/new_date.html'

    def get(self, *args, **kwargs):
        #self.date_poster = created_mailing_list()

        context = {'title': 'Редактрование афиши',
                   'date_poster': 'ssd'
                   }

        return self.render_to_response(context)



""" Блок с API для вывода """
class UrlAPIViews(generics.ListCreateAPIView):
    queryset = UrlsContent.objects.all()
    serializer_class = UrlsContentSerializer


class CityAPIViews(generics.ListCreateAPIView):
    queryset = CityMailSend.objects.all()
    serializer_class = CityMailSendSerializer

class UserAPIViews(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class DateAPIViews(generics.ListCreateAPIView):
    queryset = DateMailSend.objects.all()
    serializer_class = DateMailSendSerializer


class AllUrlsView(generics.ListAPIView):
    queryset = UrlsContent.objects.all()
    serializer_class = AllUrlSerializer







    



