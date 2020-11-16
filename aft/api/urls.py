# api/urls.py
from django.urls import include, path
from api import views

urlpatterns = [
    path('users/', include('users.urls')),
    path('bugreport/', views.bug_report),
    path('vessel_lookup/', views.vessel_lookup),
    path('ports/', views.ports),
    path('', views.api_overview)
]
