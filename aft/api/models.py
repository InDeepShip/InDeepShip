#from django.db import models
from djongo import models

# Create your models here.


class Port(models.Model):
    name = models.CharField(max_length=128, null=False, default="")

class Propulsion(models.Model):
    name = models.CharField(max_length=128, null=False, default="")

class Vessel(models.Model):
    name = models.CharField(max_length=128, null=False, default="")
    port = models.ForeignKey(Port, null=False, on_delete=models.CASCADE)
    imo = models.IntegerField(default=0)
    tonnage = models.DecimalField(max_digits=20, decimal_places=0, default=0)
    propulsion = models.ForeignKey(Propulsion, null=True, on_delete=models.CASCADE)
    yard_number = models.DecimalField(max_digits=20, decimal_places=0, default=1)
    vessel_length = models.DecimalField(max_digits=20, decimal_places=0, default=0) 
    hulls = models.DecimalField(max_digits=3, decimal_places=0, default=1)
    purpose = models.CharField(max_length=512, default="")

