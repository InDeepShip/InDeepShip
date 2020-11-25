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
    name = models.CharField(max_length=128, default="")
    address = models.EmbeddedField(
        model_container=Address
    )
    email = models.EmailField()
    telephone = models.CharField(max_length=128, default="")

    class Meta:
        abstract = True


class Engine(models.Model):
    kW = models.IntegerField(default=0)
    manufacturer = models.CharField(max_length=128)
    model = models.CharField(max_length=128)

    class Meta:
        abstract = True
    #vessel = models.ForeignKey(MerchantVessel, on_delete = models.CASCADE, null=True)


class Registration(models.Model):
    #  status: string ( one of ‘Active’, ‘Pending’, ‘Name Reserved’ )
    status = models.CharField(max_length=128, default="")

    class Meta:
        abstract = True


class MerchantVessel(models.Model):
    # The label begins with the letters "IMO" followed by either "Company" or "Registered Owner", then, followed by the seven digits.
    # https://www.irs.gov/businesses/small-businesses-self-employed/vessel-identification-numbers
    officialNumber = models.CharField(max_length=128, default="")
    name = models.CharField(max_length=128, default="")
    type = models.CharField(max_length=128, default="")
    keelLayingDate = models.DateField(null=True)
    grossTonnage = models.IntegerField(default=0)
    # https://georgiawildlife.com/hull-identification-number#:~:text=The%20Hull%20Identification%20Number%20(HIN,be%20identified%20during%20boat%20registration.
    # Manufacturer's Identification Numner (3 letters) + five characters letters or #'s,  minus O, I, and Q (they can be easily mistaken). + The last four characters determine the model and certification year of the boat.
    hin = models.CharField(max_length=128, default="")
    # https://www.egmdss.com/gmdss-courses/mod/page/view.php?id=2225
    callSign = models.CharField(max_length=128, default="")
    # MMSI = Country's MID # + 6 digits from 0-9
    # https://www.itu.int/en/ITU-R/terrestrial/fmd/Pages/mid.aspx
    mmsi = models.CharField(max_length=128, default="")
    # The label begins with the letters "IMO" followed by either "Company" or "Registered Owner", then, followed by the seven digits.
    # https://www.irs.gov/businesses/small-businesses-self-employed/vessel-identification-numbers
    imoNumber = models.IntegerField(default=0)
    yearOfBuild = models.IntegerField(default=0)
    registeredLength = models.IntegerField(default=0)
    registration = models.EmbeddedField(
        model_container=Registration
    )
    builder = models.EmbeddedField(
        model_container=LegalEntity
    )
    managingCompany = models.EmbeddedField(
        model_container=LegalEntity
    )
    engines = models.ArrayField(
        model_container=Engine
    )
    api_key = models.CharField(max_length=256, default="")
