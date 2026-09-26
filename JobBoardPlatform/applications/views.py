from email.mime import application

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Resume, Application
from .serializers import ApplicationSerializer
from accounts.models import Candidate
from jobs.models import Job
from notifications.models import Notification


class ResumeUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            candidate = request.user.candidate_profile
        except Candidate.DoesNotExist:
            return Response(
                {"error": "Candidate profile not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        resume_file = request.FILES.get("file")

        if not resume_file:
            return Response(
                {"error": "Resume file is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        resume = Resume.objects.create(
            candidate=candidate,
            file=resume_file
        )

        return Response(
            {
                "message": "Resume uploaded successfully",
                "resume": {
                    "id": resume.id,
                    "file": resume.file.url,
                    "uploaded_at": resume.uploaded_at
                }
            },
            status=status.HTTP_201_CREATED
        )


class ApplyJobView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            candidate = request.user.candidate_profile
        except Candidate.DoesNotExist:
            return Response(
                {"error": "Candidate profile not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        job_id = request.data.get("job")
        resume_id = request.data.get("resume")
        cover_letter = request.data.get("cover_letter", "")

        if not job_id:
            return Response(
                {"error": "Job ID is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            job = Job.objects.get(
                id=job_id,
                is_active=True
            )
        except Job.DoesNotExist:
            return Response(
                {"error": "Job not found or inactive."},
                status=status.HTTP_404_NOT_FOUND
            )

        resume = None

        if resume_id:
            try:
                resume = Resume.objects.get(
                    id=resume_id,
                    candidate=candidate
                )
            except Resume.DoesNotExist:
                return Response(
                    {"error": "Resume not found."},
                    status=status.HTTP_404_NOT_FOUND
                )

        if Application.objects.filter(
            candidate=candidate,
            job=job
        ).exists():
            return Response(
                {"error": "You have already applied for this job."},
                status=status.HTTP_400_BAD_REQUEST
            )

        application = Application.objects.create(
            candidate=candidate,
            job=job,
            resume=resume,
            cover_letter=cover_letter
        )

        return Response(
            {
                "message": "Job application submitted successfully",
                "application": ApplicationSerializer(application).data
            },
            status=status.HTTP_201_CREATED
        )


class MyApplicationsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            candidate = request.user.candidate_profile
        except Candidate.DoesNotExist:
            return Response(
                {"error": "Candidate profile not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        applications = Application.objects.filter(
            candidate=candidate
        ).order_by("-applied_at")

        serializer = ApplicationSerializer(
            applications,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


class EmployerApplicationsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            employer = request.user.employer_profile
        except Exception:
            return Response(
                {"error": "Employer profile not found."},
                status=status.HTTP_403_FORBIDDEN
            )

        applications = Application.objects.filter(
            job__employer=employer
        ).order_by("-applied_at")

        serializer = ApplicationSerializer(
            applications,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


class UpdateApplicationStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, application_id):
        try:
            employer = request.user.employer_profile
        except Exception:
            return Response(
                {"error": "Employer profile not found."},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            application = Application.objects.get(
                id=application_id,
                job__employer=employer
            )
        except Application.DoesNotExist:
            return Response(
                {"error": "Application not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        new_status = request.data.get("status")

        valid_statuses = [
            "Applied",
            "Shortlisted",
            "Interview",
            "Selected",
            "Rejected"
        ]

        if new_status not in valid_statuses:
            return Response(
                {
                    "error": "Invalid status.",
                    "valid_statuses": valid_statuses
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        old_status = application.status

        if old_status == new_status:
            return Response(
                {"error": f"Application is already {new_status}."},
                status=status.HTTP_400_BAD_REQUEST
    )

        application.status = new_status
        application.save()

        Notification.objects.create(
            user=application.candidate.user,
            message=f"Your application for '{application.job.title}' has been updated from {old_status} to {new_status}."
)

        return Response(
            {
                "message": "Application status updated successfully",
                "application": ApplicationSerializer(application).data
            },
            status=status.HTTP_200_OK
        )