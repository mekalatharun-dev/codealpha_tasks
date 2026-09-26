from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Job
from .serializers import JobSerializer


class JobCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            employer = request.user.employer_profile
        except Exception:
            return Response(
                {"error": "You must have an employer profile to post a job."},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = JobSerializer(data=request.data)

        if serializer.is_valid():
            job = serializer.save(employer=employer)

            return Response(
                {
                    "message": "Job posted successfully",
                    "job": JobSerializer(job).data
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class JobListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        jobs = Job.objects.filter(is_active=True)

        location = request.query_params.get("location")
        job_type = request.query_params.get("job_type")
        search = request.query_params.get("search")

        if location:
            jobs = jobs.filter(location__icontains=location)

        if job_type:
            jobs = jobs.filter(job_type__iexact=job_type)

        if search:
            jobs = jobs.filter(
                title__icontains=search
            ) | jobs.filter(
                skills_required__icontains=search
            ) | jobs.filter(
                company_name__icontains=search
            )

        serializer = JobSerializer(jobs, many=True)

        return Response(serializer.data)