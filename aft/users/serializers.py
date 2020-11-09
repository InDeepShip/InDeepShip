# users/serializers.py
from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from allauth.account.adapter import get_adapter
from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = ('email', 'name', 'password', 'address', 'account')


class CustomRegisterSerializer(RegisterSerializer):
    address = serializers.CharField()
    account = serializers.CharField()
    name = serializers.CharField()

    class Meta:
        model = models.CustomUser
        fields = ('email', 'name', 'password', 'address', 'account')

    def get_cleaned_data(self):
        return {
            'name': self.validated_data.get('name', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'email': self.validated_data.get('email', ''),
            'username': self.validated_data.get('email', ''),
            'address': self.validated_data.get('address', ''),
            'account': self.validated_data.get('account', '')
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user.address = self.cleaned_data.get('address')
        user.account = self.cleaned_data.get('account')
        user.name = self.cleaned_data.get('name')
        user.save()
        adapter.save_user(request, user, self)

        return user


class ChangePasswordSerializer(serializers.Serializer):
    model = models.CustomUser

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
