# TALKLAWS API Documentation

Base URL (development): `http://localhost:5000`
Base URL (production): `https://your-render-app.onrender.com`

---

## Public Endpoints

### POST /api/contact
Submit an enquiry from the Contact Us form.

**Auth required:** No

**Request Body:**
```json
{
  "name": "Arjun Mehta",
  "email": "arjun@example.com",
  "phone": "+91 9876543210",
  "service": "Corporate Advisory",
  "message": "I need help with my startup incorporation."
}
```

**Success (201):**
```json
{
  "success": true,
  "message": "Your enquiry has been received. We will be in touch shortly.",
  "data": {
    "id": "665f1a2b3c4d5e6f7a8b9c0d",
    "name": "Arjun Mehta",
    "createdAt": "2026-07-11T10:30:00.000Z"
  }
}
```

**Errors:**
- `400` — Validation failed (missing name, invalid email, message too short)
- `429` — Too many submissions from this IP

---

### GET /api/health
Check if the server is running.

**Auth required:** No

**Success (200):**
```json
{
  "success": true,
  "message": "TALKLAWS API is running",
  "environment": "production",
  "timestamp": "2026-07-11T10:30:00.000Z"
}
```

---

## Admin Auth Endpoints

### POST /api/admin/login
Log in as admin. Returns a JWT token.

**Auth required:** No

**Request Body:**
```json
{
  "email": "talklaws@gmail.com",
  "password": "YourPassword"
}
```

**Success (200):**
```json
{
  "success": true,
  "message": "Welcome back, Tanu Agarwal",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "665f1a2b3c4d5e6f7a8b9c0d",
    "name": "Tanu Agarwal",
    "email": "talklaws@gmail.com",
    "role": "superadmin"
  }
}
```

**Errors:**
- `400` — Missing fields
- `401` — Invalid email or password
- `429` — Too many login attempts

---

### GET /api/admin/me
Get the logged-in admin's profile.

**Auth required:** Yes (Bearer token)

**Success (200):**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "name": "Tanu Agarwal",
    "email": "talklaws@gmail.com",
    "role": "superadmin",
    "lastLogin": "2026-07-11T10:30:00.000Z"
  }
}
```

---

### POST /api/admin/change-password
Change admin password.

**Auth required:** Yes

**Request Body:**
```json
{
  "currentPassword": "OldPassword123!",
  "newPassword": "NewPassword456!"
}
```

**Success (200):**
```json
{
  "success": true,
  "message": "Password changed successfully. Please log in again."
}
```

---

## Admin Enquiry Endpoints

All require: `Authorization: Bearer <token>` header.

---

### GET /api/admin/enquiries/stats
Dashboard summary counts.

**Success (200):**
```json
{
  "success": true,
  "data": {
    "New": 12,
    "Contacted": 5,
    "Closed": 3,
    "total": 20
  }
}
```

---

### GET /api/admin/enquiries
Get all enquiries with filtering, search, pagination.

**Query Parameters:**
| Param   | Type   | Default    | Description                        |
|---------|--------|------------|------------------------------------|
| page    | number | 1          | Page number                        |
| limit   | number | 20         | Results per page                   |
| status  | string | (all)      | New, Contacted, or Closed          |
| search  | string | (none)     | Search by name or email            |
| sortBy  | string | createdAt  | Field to sort by                   |
| order   | string | desc       | asc or desc                        |

**Example:** `GET /api/admin/enquiries?page=1&limit=10&status=New&search=arjun`

**Success (200):**
```json
{
  "success": true,
  "enquiries": [ { "...enquiry objects..." } ],
  "pagination": {
    "total": 45,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

---

### GET /api/admin/enquiries/:id
Get a single enquiry.

**Success (200):**
```json
{
  "success": true,
  "data": {
    "_id": "665f...",
    "name": "Arjun Mehta",
    "email": "arjun@example.com",
    "phone": "+91 9876543210",
    "subject": "Corporate Advisory",
    "message": "I need help...",
    "status": "New",
    "adminNotes": "",
    "createdAt": "2026-07-11T10:30:00.000Z",
    "updatedAt": "2026-07-11T10:30:00.000Z"
  }
}
```

**Errors:**
- `400` — Invalid ID format
- `404` — Enquiry not found

---

### PATCH /api/admin/enquiries/:id/status
Update enquiry status and add optional notes.

**Request Body:**
```json
{
  "status": "Contacted",
  "adminNotes": "Called on 11 July. Following up next week."
}
```

**Success (200):**
```json
{
  "success": true,
  "message": "Enquiry status updated to \"Contacted\"",
  "data": { "...updated enquiry..." }
}
```

---

### DELETE /api/admin/enquiries/:id
Permanently delete an enquiry.

**Success (200):**
```json
{
  "success": true,
  "message": "Enquiry deleted successfully"
}
```

**Errors:**
- `404` — Enquiry not found
