from django.db import models

# Create your models here.
class PrivateRegistrationForms(models.Model):
    name = models.CharField(max_length=255)
    vessel = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    phone = models.DecimalField(max_digits=11, decimal_places=0)
    address = models.CharField(max_length=255)
    port = models.CharField(max_length=255)
    imo = models.DecimalField(unique=True, max_digits=20, decimal_places=0)
    tonnage = models.CharField(max_length=255)
    propulsion = models.CharField(max_length=255)
    builder_name = models.CharField(max_length=255)
    builder_address = models.CharField(max_length=255)
    yard_number = models.CharField(max_length=255)
    vessel_length = models.CharField(max_length=255)
    hulls = models.DecimalField(max_digits=3, decimal_places=0)
    purpose = models.CharField(max_length=512)

