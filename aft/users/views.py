from django.conf import settings
from rest_framework import generics
from rest_auth.registration.views import RegisterView
from rest_auth.views import LoginView
from rest_framework.response import Response
from rest_framework import status
from allauth.account import app_settings as allauth_settings
from rest_auth.app_settings import (TokenSerializer,
                                    JWTSerializer,
                                    create_token)
from . import models
from . import serializers


class UserListView(generics.ListAPIView):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSerializer

class RegisterViewCustom(RegisterView):

    def get_response_data(self, user):
        if allauth_settings.EMAIL_VERIFICATION == \
                allauth_settings.EmailVerificationMethod.MANDATORY:
            return {"detail": _("Verification e-mail sent.")}

        if getattr(settings, 'REST_USE_JWT', False):
            data = {
                'user': user,
                'token': self.token
            }
            return JWTSerializer(data).data
        else:
            if not user.is_verified:
                return { 'status': 'pending'}
            else:
                return TokenSerializer(user.auth_token).data

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        return Response(self.get_response_data(user),
                        status=status.HTTP_201_CREATED,
                        headers=headers)

class LoginViewCustom(LoginView):
    def post(self, request, *args, **kwargs):
        self.request = request
        self.serializer = self.get_serializer(data=self.request.data,
                                              context={'request': request})
        self.serializer.is_valid(raise_exception=True)

        # Custom check
        self.user = self.serializer.validated_data['user']

        if not self.user.is_verified:
            data = {
                'status': 'pending'
            }
            return Response(data,
                            status=status.HTTP_201_CREATED)
        else:
            self.login()
            return self.get_response()