// ==========================================================
// Validation Middleware
// ==========================================================
// Responsible for running validation functions
// before reaching controllers.
//
// Validation is executed before the request reaches
// the controller.
//
// Supported request sources:
// - params
// - body
// ==========================================================

import { Request, Response, NextFunction } from "express";

// ==========================================================
// Validation Function Type
// ==========================================================
// Receives unknown request data.
//
// Returns:
// - string: validation error message
// - null: validation passed
// ==========================================================

type ValidationFunction = (data: unknown) => string | null;

// ==========================================================
// Request Source Type
// ==========================================================
// Defines where validation data should be read from.
// ==========================================================

type ValidationSource = "params" | "body";

// ==========================================================
// Validate Middleware
// ==========================================================
// Runs the provided validator against request data.
//
// Example:
//
// validate(validateUserId, "params")
//
// validate(validateUpdateUser, "body")
// ==========================================================

export const validate = (
  validator: ValidationFunction,
  source: ValidationSource = "body",
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // ========================================================
    // Get Data From Request
    // ========================================================

    const data: unknown = source === "params" ? req.params : req.body;

    // ========================================================
    // Run Validation
    // ========================================================

    const error = validator(data);

    // ========================================================
    // Validation Failed
    // ========================================================

    if (error) {
      res.status(400).json({
        message: error,
      });

      return;
    }

    // ========================================================
    // Validation Passed
    // ========================================================

    next();
  };
};
