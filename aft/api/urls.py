# api/urls.py
from django.urls import include, path
from api import views

urlpatterns = [
    path('users/', include('users.urls')),
    path('bugreport/', views.bug_report),
    path('', views.api_overview)
]
