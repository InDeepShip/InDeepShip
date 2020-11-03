# users/serializers.py
from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from . import models

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = ('email', 'username', 'password', )

class CustomRegisterSerializer(RegisterSerializer):
    class Meta:
        model = models.CustomUser
        fields = ('email', 'username', 'password', )