# Register Route (`/api/auth/register`)

Public endpoint for user registration.

## Endpoint

```
POST /api/auth/register
```

## Request Body

```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe",
  "phone": "+1234567890"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | Unique email address |
| password | string | Yes | User password (min 8 chars recommended) |
| name | string | No | Full name |
| phone | string | No | Phone number |

## Response

### Success (201 Created)

```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "+1234567890",
    "status": "active",
    "date_created": "2026-05-29T00:00:00.000Z"
  },
  "token": "jwt-token-string"
}
```

### Error (400 Bad Request)
```json
{ "error": "Email and password are required" }
```

### Error (409 Conflict)
```json
{ "error": "User already exists" }
```

## Behavior

1. Validates email and password are provided
2. Checks if user with email already exists
3. Hashes password using bcrypt
4. Creates user with status "active"
5. Generates JWT token
6. Creates session record in database
7. Returns user data and token

## Notes

- Passwords are never stored in plain text
- Token expires in 7 days
- Session is stored in `sessions` table for validation
