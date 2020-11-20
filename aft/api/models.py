from djongo import models
from users.models import SiteUser 

# Create your models here.
class Port(models.Model):
    name = models.CharField(max_length=128, null=False, default="")

class Propulsion(models.Model):
    name = models.CharField(max_length=128, null=False, default="")

# Create your models here.
class Registration(models.Model):
    vessel = models.ForeignKey("Vessel", on_delete=models.CASCADE)
    port = models.ForeignKey(Port, null=False, on_delete=models.CASCADE)
    tonnage = models.IntegerField(default=0)
    propulsion = models.ForeignKey(Propulsion, null=True, on_delete=models.CASCADE)
    start_date = models.DateField(auto_now_add=True)
    yard_number = models.IntegerField(default=0)
    vessel_length = models.IntegerField(default=0)
    hulls = models.IntegerField(default=0)
    purpose = models.CharField(max_length=512)
    owner = models.ForeignKey(SiteUser, null=True, on_delete=models.CASCADE)

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
    owner = models.ForeignKey(SiteUser, null=False, on_delete=models.CASCADE)

class ReservedName(models.Model):
    name = models.CharField(blank=True, max_length=255)
    port = models.ForeignKey(Port, on_delete=models.CASCADE)
    reserving_user = models.ForeignKey(SiteUser, on_delete=models.CASCADE)
