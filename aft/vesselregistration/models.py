from djongo import models
from api.models import Vessel

# Create your models here.
class Registration(models.Model):
    vessel = models.CharField(max_length=255)
    #vessel = models.OneToOneField(Vessel, on_delete=models.CASCADE)
    port = models.CharField(max_length=255)
    imo = models.DecimalField(unique=True, max_digits=20, decimal_places=0)
    tonnage = models.CharField(max_length=255)
    propulsion = models.CharField(max_length=255)
    builder_name = models.CharField(max_length=255)
    builder_address = models.CharField(max_length=255)
    date = models.CharField(max_length=255)
    yard_number = models.CharField(max_length=255)
    vessel_length = models.CharField(max_length=255)
    hulls = models.DecimalField(max_digits=3, decimal_places=0)
    purpose = models.CharField(max_length=512)
    #def find_vessel(self):
