from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    USER_TYPE_CHOICES = (
        ("farmer", "Farmer"),
        ("distributor", "Distributor"),
        ("retailer", "Retailer"),
    )
    email = models.EmailField(unique=True)
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default="farmer")
    phone_number = models.CharField(max_length=15, blank=True)
    address = models.TextField(blank=True)