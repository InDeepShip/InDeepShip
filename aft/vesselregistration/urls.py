# vesselregistration/urls.py
from django.urls import include, path

from . import views

urlpatterns = [
    path('private-register/', views.private_register)
]