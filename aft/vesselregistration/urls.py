# api/urls.py
from django.urls import include, path
from . import views

urlpatterns = [
    path('private-registration/', views.PrivateRegistrationView.as_view()),
]
