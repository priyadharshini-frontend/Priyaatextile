# Auth Utilities (`src/lib/auth.ts`)

Authentication utilities for password hashing, JWT tokens, and session management.

## Functions

### `hashPassword(password: string): Promise<string>`
Hashes a password using bcrypt with 10 salt rounds.

### `verifyPassword(password: string, hashedPassword: string): Promise<boolean>`
Verifies a password against a bcrypt hash.

### `generateToken(payload: TokenPayload): string`
Generates a JWT token with 7-day expiration.
- Payload: `{ userId, email, role? }`

### `verifyToken(token: string): TokenPayload | null`
Verifies and decodes a JWT token. Returns null if invalid/expired.

### `createSession(token: string, ipAddress: string | null | undefined): Promise<void>`
Creates a session record in the database.

### `deleteSession(token: string): Promise<void>`
Deletes a session from the database.

### `extractToken(req: NextRequest): string | null`
Extracts JWT from `Authorization: Bearer <token>` header.

### `validateSession(token: string): Promise<AuthUser | null>`
Validates a session exists and is active, then returns user data.

### `requireAuth(req: NextRequest): Promise<AuthUser | null>`
Returns the authenticated user or null if not logged in.

### `requireAdmin(req: NextRequest): Promise<AuthUser | null>`
Returns the user if they have admin role, otherwise null.

## Types

```typescript
interface TokenPayload {
  userId: string;
  email: string;
  role?: string;
}

interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  role?: string;
}
```

## Environment Variables

- `JWT_SECRET` - Secret key for signing JWTs (defaults to "your-secret-key" in dev)
