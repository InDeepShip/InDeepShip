# users/serializers.py
from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from allauth.account.adapter import get_adapter
from . import models

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = ('email', 'username', 'password', 'is_private', 'is_broker')

class CustomRegisterSerializer(RegisterSerializer):
    is_private = serializers.BooleanField()
    is_broker = serializers.BooleanField()
    class Meta:
        model = models.CustomUser
        fields = ('email', 'username', 'password', 'is_private', 'is_broker')

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'email': self.validated_data.get('email', ''),
            'is_private': self.validated_data.get('is_private', ''),
            'is_broker': self.validated_data.get('is_broker', '')
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user.is_private = self.cleaned_data.get('is_private')
        user.is_broker = self.cleaned_data.get('is_broker')
        user.save()
        adapter.save_user(request, user, self)

        return user
