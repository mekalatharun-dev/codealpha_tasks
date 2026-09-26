from django.contrib import admin
from .models import Resume, Application


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "candidate",
        "uploaded_at",
    )


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "candidate",
        "job",
        "status",
        "applied_at",
        "updated_at",
    )
    list_filter = (
        "status",
        "applied_at",
    )
    search_fields = (
        "candidate__user__username",
        "job__title",
    )