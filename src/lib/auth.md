# Auth Utilities (`src/lib/auth.ts`)

Authentication utilities for password hashing, JWT tokens, and session management.

## Functions

### `hashPassword(password: string): Promise<string>`
Hashes a password using bcrypt with 10 salt rounds.

### `verifyPassword(password: string, hashedPassword: string): Promise<boolean>`
Verifies a password against a bcrypt hash.

### `generateToken(payload: TokenPayload, sessionId: string): string`
Generates a JWT token with 7-day expiration.
- Payload: `{ userId, email, role?, sessionId }`
- `sessionId` is a UUID that identifies the session in the database

### `verifyToken(token: string): TokenPayload | null`
Verifies and decodes a JWT token. Returns null if invalid/expired.

### `createSession(userId: string, ipAddress: string | null | undefined): Promise<{ sessionId: string; sessionToken: string }>`
Creates a session record in the database with a UUID as id and a random hex token.
- Returns the sessionId (UUID) and sessionToken (random hex string)
- The JWT is NOT stored in the database - only the random sessionToken is stored

### `deleteSession(sessionId: string): Promise<void>`
Deletes a session from the database by sessionId (UUID).

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
  sessionId: string;
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
