from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.forms import PasswordInput, CharField, EmailInput


class LoginUserForm(AuthenticationForm):
    username = CharField(
        label='Почтовый адрес',
        widget=EmailInput(attrs={
            'class': 'form-control',
            'id': 'floatingInput',
            'placeholder': 'Почта'
        })
    )
    password = CharField(
        label='Пароль',
        widget=PasswordInput(attrs={
            'class': 'form-control',
            'id': 'floatingPassword',
            'placeholder': 'Пароль',

        })
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.label_suffix = ''

    class Meta:
        model = get_user_model()
        fields = ['username', 'password']


# форма регистрации
class RegisterUserForm(UserCreationForm):
    email = CharField(
        label='Почта',
        widget=EmailInput(attrs={
            'class': 'form-control',
            'id': 'floatingInput',
            'placeholder': 'Почта',
        })
    )
    password1 = CharField(
        label='Пароль',
        widget=PasswordInput(attrs={
            'class': 'form-control',
            'id': 'floatingPassword'
        })
    )
    password2 = CharField(
        label='повторите пароль',
        widget=PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'повторите пароль',
            'id': 'floatingPassword'
        })
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.label_suffix = ''

    class Meta:
        model = get_user_model()
        fields = ['email', 'password1', 'password2']


class UrlsForDate(forms.Form):
    poster_url = forms.URLField(max_length=100, label='Url афиши', required=True)


class DateOfPoster:
    pass

