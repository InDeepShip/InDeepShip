# users/models.py
from django.contrib.auth.models import AbstractUser
#from django.db import models
#from api.models import Port, Vessel, Propulsion
#from vesselregistration.models import Registration
from djongo import models
from api import models as api_models


class Address(models.Model):
    lineOne = models.CharField(max_length=128, null=True)
    # for apt number and what not
    lineTwo = models.CharField(max_length=128, null=True)
    lineThree = models.CharField(max_length=64, null=True)
    postcode = models.CharField(max_length=64, null=True)
    # needs to be in standardized country code
    # https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes alpha-3, so 3 character code
    country = models.CharField(max_length=5, null=True)

    class Meta:
        abstract = True

    def __str__(self):
        return "{} {} {} {} {}".format(self.lineOne,
                                       self.lineTwo,
                                       self.lineThree,
                                       self.postcode,
                                       self.country)


class CustomUser(AbstractUser):
    """
    Types of user accounts:
    broker
    private
    corporate
    """

    name = models.CharField(blank=True, max_length=255)
    address = models.CharField(blank=True, max_length=255)
    account = models.CharField(blank=True, max_length=255)
    is_verified = models.BooleanField(default=True)

    def __str__(self):
        return self.email
