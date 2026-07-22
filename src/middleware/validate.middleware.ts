// ==========================================================
// Validation Middleware
// ==========================================================
// Responsible for running validation functions
// before reaching controllers.
// ==========================================================

import { Request, Response, NextFunction } from "express";

// Validation function type

type ValidationFunction = (data: any) => string | null;

export const validate = (
  validator: ValidationFunction,
  source: "params" | "body" = "body",
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const data = source === "params" ? req.params : req.body;

    const error = validator(data);

    if (error) {
      res.status(400).json({
        message: error,
      });

      return;
    }

    next();
  };
};
