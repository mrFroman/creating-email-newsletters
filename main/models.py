
from django.contrib.auth import get_user_model
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models

''' модели для создания пользователя и входа '''


class UserManager(BaseUserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('Почтовый адрес должен быть задан')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_user(self, email, password, **extra_fields):
        extra_fields['is_staff'] = False
        extra_fields['is_superuser'] = False
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields['is_staff'] = True
        extra_fields['is_superuser'] = True
        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField('Почтовый адрес', max_length=50, db_index=True, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    objects = UserManager()


''' модель для главной страницы '''


class Mainindex(models.Model):
    get_user_model()
    title = models.CharField('Название', max_length=50)

    class Meta:
        verbose_name = 'Главная'
        verbose_name_plural = 'Главная страница'


class UrlsContent(models.Model):
    poster_url = models.ForeignKey('UrlsPoster', on_delete=models.PROTECT, null=True)
    name_event = models.CharField('Название мероприятия', max_length=100)
    rate = models.CharField('Возрастной ценз', max_length=4)
    date_event = models.CharField('Дата мероприятия', max_length=20)
    time_event = models.CharField('Время мероприятия', max_length=20)
    venue = models.CharField('Место проведения', max_length=50)
    price = models.CharField('Цена', max_length=20)
    content_text = models.TextField('Описание мероприятия', max_length=300)

    def __str__(self):
        return self.poster_url, self.name_event, self.rate, self.date_event, self.time_event, self.venue, self.price, \
               self.content_text


class UrlsPoster(models.Model):
    poster_url = models.URLField('Ссылка на мероприятие', max_length=60)

    def __str__(self):
        return self.poster_url

