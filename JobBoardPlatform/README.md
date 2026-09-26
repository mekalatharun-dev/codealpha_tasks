# Job Board Platform

A RESTful Job Board Platform built with **Django** and **Django REST Framework**. The platform allows candidates to create profiles, upload resumes, apply for jobs, and track application status. Employers can create job postings, view applications, update application status, and notify candidates.

## 🚀 Features

### Candidate

* User registration and login
* JWT authentication
* Candidate profile creation
* Resume upload
* Browse active jobs
* Search and filter jobs
* Apply for jobs
* Prevent duplicate applications
* View submitted applications
* Receive application status notifications
* Mark notifications as read

### Employer

* Employer registration and login
* JWT authentication
* Employer profile creation
* Create job postings
* View applications received for posted jobs
* Update application status
* Prevent unnecessary duplicate status notifications

### Application Status

Applications can move through the following stages:

`Applied → Shortlisted → Interview → Selected / Rejected`

## 🛠️ Tech Stack

* **Backend:** Python, Django
* **API:** Django REST Framework
* **Authentication:** JWT using SimpleJWT
* **Database:** SQLite
* **API Testing:** Postman
* **Version Control:** Git & GitHub

## 📁 Project Structure

```text
JobBoardPlatform/
│
├── accounts/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
│
├── jobs/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
│
├── applications/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
│
├── notifications/
│   ├── models.py
│   ├── views.py
│   └── urls.py
│
├── config/
│   ├── settings.py
│   └── urls.py
│
├── manage.py
├── requirements.txt
└── README.md
```

## 🔐 Authentication

The API uses **JWT authentication**.

Users first log in through:

```text
POST /api/accounts/login/
```

The API returns an access token and refresh token.

The access token is then sent with protected requests:

```text
Authorization: Bearer <access_token>
```

## 🔗 API Endpoints

### Accounts

| Method | Endpoint                   | Description              |
| ------ | -------------------------- | ------------------------ |
| POST   | `/api/accounts/register/`  | Register user            |
| POST   | `/api/accounts/login/`     | Login                    |
| POST   | `/api/accounts/candidate/` | Create candidate profile |
| POST   | `/api/accounts/employer/`  | Create employer profile  |

### Jobs

| Method | Endpoint            | Description      |
| ------ | ------------------- | ---------------- |
| GET    | `/api/jobs/`        | List active jobs |
| POST   | `/api/jobs/create/` | Create a job     |

Job listing supports filters such as:

```text
/api/jobs/?location=Hyderabad
/api/jobs/?job_type=Full-time
/api/jobs/?search=Python
```

### Applications

| Method | Endpoint                                   | Description                 |
| ------ | ------------------------------------------ | --------------------------- |
| POST   | `/api/applications/resume/`                | Upload resume               |
| POST   | `/api/applications/apply/`                 | Apply for a job             |
| GET    | `/api/applications/my-applications/`       | View candidate applications |
| GET    | `/api/applications/employer-applications/` | View employer applications  |
| PATCH  | `/api/applications/<id>/status/`           | Update application status   |

### Notifications

| Method | Endpoint                        | Description               |
| ------ | ------------------------------- | ------------------------- |
| GET    | `/api/notifications/`           | View notifications        |
| PATCH  | `/api/notifications/<id>/read/` | Mark notification as read |

## 🔄 Application Workflow

```text
Candidate
   │
   ├── Register
   ├── Login
   ├── Create Profile
   ├── Upload Resume
   │
   ▼
Browse Jobs
   │
   ▼
Apply for Job
   │
   ▼
Application Created
   │
   ▼
Employer Views Application
   │
   ▼
Employer Updates Status
   │
   ▼
Candidate Receives Notification
   │
   ▼
Candidate Marks Notification as Read
```

## 🧪 Tested Workflow

The complete API workflow was tested using Postman:

* Candidate profile creation ✅
* Employer profile creation ✅
* Resume upload ✅
* Job creation ✅
* Job application ✅
* Employer viewing applications ✅
* Application status update ✅
* Notification creation ✅
* Notification read status ✅
* Duplicate application protection ✅
* Duplicate status update protection ✅

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd JobBoardPlatform
```

### 2. Create a virtual environment

Windows:

```bash
python -m venv venv
```

### 3. Activate the virtual environment

```bash
venv\Scripts\activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Run migrations

```bash
python manage.py migrate
```

### 6. Start the development server

```bash
python manage.py runserver
```

The API will be available at:

```text
http://127.0.0.1:8000/
```

## 🧑‍💻 Example Job

```json
{
    "title": "Python Backend Developer",
    "description": "We are looking for a Python Backend Developer to build and maintain REST APIs.",
    "location": "Hyderabad",
    "job_type": "Full-time",
    "skills_required": "Python, Django, REST API, SQL, Git",
    "company_name": "TechNova Solutions"
}
```

## 📌 Future Improvements

* Frontend interface for candidates and employers
* Pagination
* Advanced job filtering
* Email notifications
* Password reset
* Resume download/viewing
* Employer dashboard
* Candidate dashboard
* Job editing and deletion
* Deployment with a production database

## 👨‍💻 Author

**Tharun Mekala**

B.Tech Computer Science and Engineering

Interested in **Python Backend Development, Software Engineering, and AI/ML**.
