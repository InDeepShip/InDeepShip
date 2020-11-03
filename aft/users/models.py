# users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    name = models.CharField(blank=True, max_length=255)
    is_private = models.BooleanField(default=True)
    is_broker = models.BooleanField(default=False)

    def __str__(self):
        return self.email

class Broker(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.email