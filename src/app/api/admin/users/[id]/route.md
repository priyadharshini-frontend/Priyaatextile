# Admin User By ID Route (`/api/admin/users/[id]`)

Protected admin endpoints for single user management.

## Authentication

All endpoints require `Authorization: Bearer <token>` header with admin role.

## Endpoints

### GET /api/admin/users/[id]

Get a single user by ID.

**Response (200 OK)**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "phone": "+1234567890",
  "status": "active",
  "date_created": "2026-05-29T00:00:00.000Z"
}
```

**Error (404 Not Found)**
```json
{ "error": "User not found" }
```

### PATCH /api/admin/users/[id]

Update a user's fields.

**Request Body** (all fields optional)
```json
{
  "email": "newemail@example.com",
  "password": "newpassword",
  "name": "Updated Name",
  "phone": "+9876543210",
  "status": "inactive"
}
```

**Response (200 OK)**
```json
{
  "id": "uuid",
  "email": "newemail@example.com",
  "name": "Updated Name",
  "phone": "+9876543210",
  "status": "inactive",
  "date_created": "2026-05-29T00:00:00.000Z"
}
```

**Error (404 Not Found)**
```json
{ "error": "User not found" }
```

### DELETE /api/admin/users/[id]

Delete a user.

**Response (200 OK)**
```json
{ "message": "User deleted successfully" }
```

**Error (404 Not Found)**
```json
{ "error": "User not found" }
```

## Error Responses

### 401 Unauthorized
```json
{ "error": "Unauthorized" }
```
Returned when no valid admin token is provided.

## Notes

- Only accessible by admin users
- Updates only include provided fields
- Password updates trigger re-hashing
- DELETE is permanent and cannot be undone
