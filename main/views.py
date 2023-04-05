import json
import logging
from django.contrib.auth.views import LoginView, LogoutView
from django.forms import formset_factory
from django.shortcuts import reverse, redirect
from django.urls import reverse_lazy
from django.views.generic import CreateView, ListView, TemplateView
from .models import Mainindex
from .form import LoginUserForm, RegisterUserForm, UrlsForDate
from .services import created_mailing_list


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
        context = super().get_context_date(**kwargs)
        context['title'] = 'Регистрация'
        return context


''' класс выбора рассылки '''
class Index(ListView):
    model = Mainindex
    PosterFormset = formset_factory(UrlsForDate)
    formset_poster = PosterFormset
    template_name = 'main/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Шаблонизатор'
        context['formset_poster'] = self.formset_poster
        return context

    def post(self, *args, **kwargs):
        context = {
            'formset_poster': self.formset_poster
        }

        formset_poster = self.PosterFormset(data=self.request.POST)

        if formset_poster.is_valid():
            content = formset_poster.cleaned_data
            with open('json_url.json', 'w', encoding='utf-8') as file:
                json.dump(content, file, indent=4)
            return redirect(reverse_lazy('main:new_date'))
        return self.render_to_response(context)


''' класс ввода ссылок и сборка афиши '''
class CreateMail(TemplateView):
    template_name = 'main/new_date.html'

    def get(self, *args, **kwargs):

        self.date_poster = created_mailing_list()

        context = {'title': 'Редактрование афиши',
                   'date_poster': json.dumps(self.date_poster)
                   }

        return self.render_to_response(context)


''' чтоб изменения в гит подлетели '''




