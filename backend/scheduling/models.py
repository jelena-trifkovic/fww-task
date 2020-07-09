from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    def __str__(self):
        return f'{self.username}, {self.password}'

class Event(models.Model):
    name = models.CharField(max_length=30)
    date = models.DateField()
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f'{self.name}, {self.date}, User({self.user})'