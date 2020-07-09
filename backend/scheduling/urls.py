from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
#from .views import SigninView, SignupView, DayDataView, EventView

urlpatterns = [
    #path('signin/', SigninView.as_view()),
    #path('signup/', SignupView.as_view()),
    #path('calendar/', DayDataView.as_view()),
    #path('event-day/', EventView.as_view()),
    path('token/obtain/', TokenObtainPairView.as_view(), name='token_create'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]