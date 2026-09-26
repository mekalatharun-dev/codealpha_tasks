from django.db import models
from accounts.models import Employer


class Job(models.Model):
    JOB_TYPES = [
        ("Full-time", "Full-time"),
        ("Part-time", "Part-time"),
        ("Internship", "Internship"),
        ("Contract", "Contract"),
    ]

    employer = models.ForeignKey(
        Employer,
        on_delete=models.CASCADE,
        related_name="jobs"
    )
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255)
    job_type = models.CharField(
        max_length=20,
        choices=JOB_TYPES
    )
    salary_min = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True
    )
    salary_max = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True
    )
    skills_required = models.TextField(
        help_text="Comma-separated skills"
    )
    company_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title