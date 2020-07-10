from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import CustomUserCreate, EventCreate, EventDelete, EventEdit

urlpatterns = [
    path('user/create/', CustomUserCreate.as_view(), name="create_user"),
    path('event/create/', EventCreate.as_view(), name="create_event"),
    path('event/delete/<int:pk>', EventDelete.as_view(), name="delete_event"),
    path('event/edit/<int:pk>', EventEdit.as_view(), name="edit_event"),
    path('token/obtain/', TokenObtainPairView.as_view(), name='token_create'), 
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]