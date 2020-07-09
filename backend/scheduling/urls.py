from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import CustomUserCreate

urlpatterns = [
    path('user/create/', CustomUserCreate.as_view(), name="create_user"),
    path('token/obtain/', TokenObtainPairView.as_view(), name='token_create'), 
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]