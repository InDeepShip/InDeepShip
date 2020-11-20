# api/urls.py
from django.urls import include, path
from vesselregistration import views

urlpatterns = [
    path('private-registration/', views.private_registration),
    path('private-registrations/', views.user_private_registrations)
]
