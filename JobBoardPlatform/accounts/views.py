from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import UserSerializer, CandidateSerializer
from .serializers import UserSerializer, CandidateSerializer, EmployerSerializer


class RegisterView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

            return Response(
                {
                    "message": "User registered successfully",
                    "user": UserSerializer(user).data
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class LoginView(APIView):

    def post(self, request):
        from django.contrib.auth import authenticate

        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(
            username=username,
            password=password
        )

        if user is None:
            return Response(
                {"error": "Invalid username or password"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "message": "Login successful",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email
                }
            },
            status=status.HTTP_200_OK
        )


class CandidateProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if hasattr(request.user, "candidate_profile"):
            return Response(
                {"error": "Candidate profile already exists."},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = CandidateSerializer(data=request.data)

        if serializer.is_valid():
            candidate = serializer.save(user=request.user)

            return Response(
                {
                    "message": "Candidate profile created successfully",
                    "candidate": CandidateSerializer(candidate).data
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
class EmployerProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if hasattr(request.user, "employer_profile"):
            return Response(
                {"error": "Employer profile already exists."},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = EmployerSerializer(data=request.data)

        if serializer.is_valid():
            employer = serializer.save(user=request.user)

            return Response(
                {
                    "message": "Employer profile created successfully",
                    "employer": EmployerSerializer(employer).data
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )        