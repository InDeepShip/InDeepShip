# users/forms.py
from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm, PasswordResetForm, PasswordChangeForm
from .models import CustomUser


class CustomUserCreationForm(UserCreationForm):

    class Meta:
        model = CustomUser
        fields = ('username', 'email')


class CustomUserChangeForm(UserChangeForm):

    class Meta:
        model = CustomUser
        fields = UserChangeForm.Meta.fields


class CustomPasswordResetForm(PasswordResetForm):

    class Meta:
        model = CustomUser
        fields = PasswordResetForm.Meta.fields


class CustomPasswordChangeForm(PasswordChangeForm):

    class Meta:
        model = CustomUser
        fields = PasswordChangeForm.Meta.fields
