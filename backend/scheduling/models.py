from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    def __str__(self):
        return f'CustomUser({self.id}, {self.username}, {self.password})'

class Event(models.Model):
    name = models.CharField(max_length=30)
    date = models.DateField()
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return f'Event({self.id}, {self.name}, {self.date}, {self.user.username})'
