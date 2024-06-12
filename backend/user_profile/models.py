from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_image = models.ImageField(upload_to='profile_images/', null=True, blank=True)
    display_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=255)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=[('male', 'Male'), ('female', 'Female')])
    current_occupation = models.CharField(max_length=100)
    birthday = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=20)
    address = models.CharField(max_length=255)
    catch_phrase = models.CharField(max_length=255)
    introduction = models.TextField()

    def __str__(self):
        return self.display_name
