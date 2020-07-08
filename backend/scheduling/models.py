from django.db import models

class User(models.Model):
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=30)

    def __str__(self):
        return f'{self.username}, {self.password}'

class Event(models.Model):
    name = models.CharField(max_length=30)
    date = models.DateField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f'{self.name}, {self.date}, User({self.user})'