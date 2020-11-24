# api/urls.py
from django.urls import include, path
from api import views

urlpatterns = [
    path('users/', include('users.urls')),
    path('vesselregistration/', include('vesselregistration.urls')),
    path('bugreport/', views.bug_report),
    path('vessel_lookup/', views.vessel_lookup),
    path('ports/', views.ports),
    path('propulsion_methods/', views.propulsion_methods),
    path('reserve-name/', views.reserve_name),
    path('vessels/', views.get_vessels),
    path('', views.api_overview)
]
