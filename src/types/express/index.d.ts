// ==========================================================
// Express Request Type Extension
// ==========================================================
// Extends Express Request object to include authenticated user.
//
// The `user` property is added by:
// - protect middleware
//
// Example:
// req.user.id
// req.user.role
// ==========================================================

declare global {
  namespace Express {
    interface Request {
      user?: {
        // User ID extracted from the JWT token.
        // Stored and handled as a string across the application.
        id: string;

        // Authenticated user's name.
        name: string;

        // Authenticated user's email.
        email: string;

        // Authenticated user's role.
        role: "user" | "admin";
      };
    }
  }
}

export {};
