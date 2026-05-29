# Admin Users Route (`/api/admin/users`)

Protected admin endpoints for user management.

## Authentication

All endpoints require `Authorization: Bearer <token>` header with admin role.

## Endpoints

### GET /api/admin/users

List all users.

**Response (200 OK)**
```json
[
  {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "+1234567890",
    "status": "active",
    "date_created": "2026-05-29T00:00:00.000Z"
  }
]
```

### POST /api/admin/users

Create a new user.

**Request Body**
```json
{
  "email": "newuser@example.com",
  "password": "securepassword",
  "name": "Jane Doe",
  "phone": "+1234567890"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | Unique email address |
| password | string | Yes | User password |
| name | string | No | Full name |
| phone | string | No | Phone number |

**Response (201 Created)**
```json
{
  "id": "uuid",
  "email": "newuser@example.com",
  "name": "Jane Doe",
  "phone": "+1234567890",
  "status": "active",
  "date_created": "2026-05-29T00:00:00.000Z"
}
```

**Error (409 Conflict)**
```json
{ "error": "User already exists" }
```

## Error Responses

### 401 Unauthorized
```json
{ "error": "Unauthorized" }
```
Returned when no valid admin token is provided.

## Notes

- Only accessible by admin users
- Users cannot be created with duplicate emails
- Passwords are hashed before storage
