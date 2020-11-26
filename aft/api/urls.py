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
    path('user_vessels/', views.get_user_vessels),
    path('registrations/', views.get_registrations),
    path('vessels/', views.get_merchant_vessels),
    path('vesselstatus/', views.get_statuses),
    path('payments/', include('payments.urls')),
    path('surveyors/', views.get_surveyors),
    path('assign-surveyor/', views.assign_surveyor),
    path('', views.api_overview)
]
