from django.db import models
from django.contrib.auth.models import User


class Employer(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='employer_profile'
    )
    company_name = models.CharField(max_length=255)
    company_description = models.TextField(blank=True)
    website = models.URLField(blank=True)

    def __str__(self):
        return self.company_name


class Candidate(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='candidate_profile'
    )
    phone = models.CharField(max_length=20)
    location = models.CharField(max_length=255)
    skills = models.TextField(
        help_text="Comma-separated skills"
    )

    def __str__(self):
        return self.user.username