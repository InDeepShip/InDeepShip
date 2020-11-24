from djongo import models
from users.models import CustomUser, Address

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
    propulsion = models.ForeignKey(
        Propulsion, null=True, on_delete=models.CASCADE)
    start_date = models.DateField(auto_now_add=True)
    expiration_date = models.DateField(default=None)
    yard_number = models.IntegerField(default=0)
    vessel_length = models.IntegerField(default=0)
    hulls = models.IntegerField(default=0)
    purpose = models.CharField(max_length=512)
    owner = models.ForeignKey(CustomUser, null=True, on_delete=models.CASCADE)


class Vessel(models.Model):
    name = models.CharField(max_length=128, null=False, default="")
    port = models.ForeignKey(Port, null=False, on_delete=models.CASCADE)
    imo = models.IntegerField(default=0)
    tonnage = models.DecimalField(max_digits=20, decimal_places=0, default=0)
    propulsion = models.ForeignKey(
        Propulsion, null=True, on_delete=models.CASCADE)
    yard_number = models.DecimalField(
        max_digits=20, decimal_places=0, default=1)
    vessel_length = models.DecimalField(
        max_digits=20, decimal_places=0, default=0)
    hulls = models.DecimalField(max_digits=3, decimal_places=0, default=1)
    purpose = models.CharField(max_length=512, default="")
    owner = models.ForeignKey(CustomUser, null=False, on_delete=models.CASCADE)


class ReservedName(models.Model):
    name = models.CharField(blank=True, max_length=255)
    port = models.ForeignKey(Port, on_delete=models.CASCADE)
    reserving_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

class LegalEntity(models.Model):
    name = models.CharField(max_length = 128, default="")
    address = models.OneToOneField(Address, null=True, on_delete=models.CASCADE)
    email = models.EmailField()
    telephone = models.CharField(max_length = 128, default="")

class Engine(models.Model):
    kW = models.IntegerField(default=0)
    manufacturer = models.CharField(max_length = 128)
    model = models.CharField(max_length = 128)
    #vessel = models.ForeignKey(MerchantVessel, on_delete = models.CASCADE, null=True)

class MerchantVessel(models.Model):
    officialNumber = models.CharField(max_length = 128, default="")
    name = models.CharField(max_length = 128,default="")
    type = models.CharField(max_length = 128,default="")
    keelLayingDate = models.DateField(null=True)
    grossTonnage = models.IntegerField(default=0)
    hin = models.CharField(max_length = 128,default="")
    callSign = models.CharField(max_length = 128,default="")
    mmsi = models.CharField(max_length = 128,default="")
    imoNumber = models.IntegerField(default=0)
    yearOfBuild = models.IntegerField(default=0)
    registeredLength = models.IntegerField(default=0)
    registration = models.CharField(max_length = 128,default="")
    builder = models.ForeignKey(LegalEntity, related_name="builder",on_delete = models.CASCADE, null=True)
    managingCompany = models.ForeignKey(LegalEntity, related_name = "managingCompany",on_delete = models.CASCADE, null=True)
    engines = models.ManyToManyField(Engine)
    api_key = models.CharField(max_length = 256, default="")
