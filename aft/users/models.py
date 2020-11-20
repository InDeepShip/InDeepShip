# users/models.py
from django.contrib.auth.models import AbstractUser
#from django.db import models
#from api.models import Port, Vessel, Propulsion
#from vesselregistration.models import Registration
from djongo import models
from api import models as api_models

class Address(models.Model):
     address1 = models.CharField(max_length=128, null=True)
     # for apt number and what not
     address2 = models.CharField(max_length=128, null=True)
     city = models.CharField(max_length=64, null=True)
     state = models.CharField(max_length=64, null=True)
     zipCode = models.CharField(max_length=5, null=True)

     def __str__(self):
         return "{} {} {} {} {}".format(self.address1,
                                        self.address2,
                                        self.city,
                                        self.state,
                                        self.zipCode)
class CustomUser(AbstractUser):
    name = models.CharField(blank=True, max_length=255)
    address = models.CharField(blank=True, max_length=255)
    account = models.CharField(blank=True, max_length=255)

    def __str__(self):
        return self.email


class SiteUser(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    address = models.OneToOneField(Address, null=False, on_delete=models.CASCADE)
    user_type = models.CharField(max_length=100, default="Broker")
    
    def __str__(self):
        return self.user.email
"""
Types of users:
Broker
PrivateUser
"""
