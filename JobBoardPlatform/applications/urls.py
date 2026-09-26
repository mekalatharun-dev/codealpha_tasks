from django.urls import path
from .views import (
    ResumeUploadView,
    ApplyJobView,
    MyApplicationsView,
    EmployerApplicationsView,
    UpdateApplicationStatusView
)

urlpatterns = [
    path("resume/", ResumeUploadView.as_view(), name="resume-upload"),
    path("apply/", ApplyJobView.as_view(), name="apply-job"),
    path(
        "my-applications/",
        MyApplicationsView.as_view(),
        name="my-applications"
    ),
    path(
        "employer-applications/",
        EmployerApplicationsView.as_view(),
        name="employer-applications"
    ),
    path(
        "<int:application_id>/status/",
        UpdateApplicationStatusView.as_view(),
        name="update-application-status"
    ),
]