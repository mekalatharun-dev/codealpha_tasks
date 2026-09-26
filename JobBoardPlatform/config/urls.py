"""
URL configuration for config project.
"""

from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path


def home(request):
    return JsonResponse({
        "message": "Job Board Platform API is running",
        "status": "success",
        "endpoints": {
            "accounts": "/api/accounts/",
            "jobs": "/api/jobs/",
            "applications": "/api/applications/",
            "notifications": "/api/notifications/",
            "admin": "/admin/",
        },
    })


urlpatterns = [
    path("", home, name="home"),
    path("admin/", admin.site.urls),
    path("api/accounts/", include("accounts.urls")),
    path("api/jobs/", include("jobs.urls")),
    path("api/applications/", include("applications.urls")),
    path("api/notifications/", include("notifications.urls")),
]