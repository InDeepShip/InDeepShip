# users/urls.py
from django.urls import include, path

from . import views

urlpatterns = [
    path('signup/', include('rest_auth.registration.urls')),
    path('all', views.UserListView.as_view()),
    path('', include('rest_auth.urls')),
    path('password_reset/',
         include('django_rest_passwordreset.urls', namespace='password_reset'))
]
