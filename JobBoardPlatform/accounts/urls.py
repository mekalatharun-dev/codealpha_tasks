from django.urls import path

from .views import (
    RegisterView,
    LoginView,
    CandidateProfileView,
    EmployerProfileView
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("candidate/", CandidateProfileView.as_view(), name="candidate-profile"),
    path("employer/", EmployerProfileView.as_view(), name="employer-profile"),
]