from django.urls import path
from .views import SigninView, SignupView, DayDataView, EventView

urlpatterns = [
    path('signin/', SigninView.as_view()),
    path('signup/', SignupView.as_view()),
    path('calendar/', DayDataView.as_view()),
    path('event-day/', EventView.as_view()),
]