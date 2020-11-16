# users/urls.py
from django.urls import include, path, re_path
from rest_auth.views import PasswordResetConfirmView

from . import views

urlpatterns = [
    path('signup/', include('rest_auth.registration.urls')),
    path('all', views.UserListView.as_view()),
    path('', include('rest_auth.urls')),
    re_path(r'^rest-auth/password/reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', PasswordResetConfirmView.as_view(),
            name='password_reset_confirm')
]
