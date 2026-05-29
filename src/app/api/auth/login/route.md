# Login Route (`/api/auth/login`)

Public endpoint for user authentication.

## Endpoint

```
POST /api/auth/login
```

## Request Body

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | Registered email address |
| password | string | Yes | User password |

## Response

### Success (200 OK)

```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "+1234567890",
    "status": "active"
  },
  "token": "jwt-token-string"
}
```

### Error (400 Bad Request)
```json
{ "error": "Email and password are required" }
```

### Error (401 Unauthorized)
```json
{ "error": "Invalid credentials" }
```

## Behavior

1. Validates email and password are provided
2. Finds user by email
3. Verifies password against bcrypt hash
4. Generates JWT token
5. Creates session record in database
6. Returns user data and token

## Notes

- Token expires in 7 days
- Session is stored in `sessions` table
- IP address is captured for session tracking
