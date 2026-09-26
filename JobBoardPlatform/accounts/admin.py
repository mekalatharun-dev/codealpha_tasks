from django.contrib import admin
from .models import Employer, Candidate


@admin.register(Employer)
class EmployerAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "company_name",
        "website",
    )
    search_fields = (
        "company_name",
        "user__username",
    )


@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "phone",
        "location",
    )
    search_fields = (
        "user__username",
        "location",
        "skills",
    )