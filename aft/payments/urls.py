# payments/urls.py
from django.conf.urls import url
from payments import views

urlpatterns = [
    url(r'^test-payment/$', views.test_payment),
    url(r'^create-checkout-session/$', views.create_checkout_session),
]