from django.urls import path
from . import views

urlpatterns = [
    path('profiles/', views.ProfileListCreate.as_view(), name='profile-list-create'),
]