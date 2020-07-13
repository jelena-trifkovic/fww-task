from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    path('users/<username>', views.CustomUserGet.as_view()),
    path('user/create/', views.CustomUserCreate.as_view(), name="create_user"),
    path('events/<username>', views.EventsGet.as_view(), name="get_events"),
    path('event/create/', views.EventCreate.as_view(), name="create_event"),
    path('event/delete/<int:pk>', views.EventDelete.as_view(), name="delete_event"),
    path('event/edit/<int:pk>', views.EventEdit.as_view(), name="edit_event"),
    path('token/obtain/', TokenObtainPairView.as_view(), name='token_create'), 
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]