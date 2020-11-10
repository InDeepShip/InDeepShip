from django.db import models

# Create your models here.


class Port(models.Model):
    name = models.CharField(max_length = 128, null=False, default="")


class Vessel(models.Model):
    name = models.CharField(max_length = 128, null=False, default="")
    port = models.ForeignKey(Port, null=False, on_delete=models.CASCADE)

