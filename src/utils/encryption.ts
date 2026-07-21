// ==========================================================
// Encryption Utility
// ==========================================================
// Responsible for encrypting and decrypting sensitive data.
//
// Used for:
// - Stored passwords
//
// Algorithm:
// AES-256-CBC
//
// Note:
// ENCRYPTION_KEY must exist in environment variables.
// ==========================================================

import crypto from "crypto";

const algorithm = "aes-256-cbc";

// ==========================================================
// Generate Encryption Key
// ==========================================================

const getKey = (): Buffer => {
  const secret = process.env.ENCRYPTION_KEY;

  if (!secret) {
    throw new Error("ENCRYPTION_KEY is missing");
  }

  return crypto.createHash("sha256").update(secret).digest();
};

// ==========================================================
// Encrypt Data
// ==========================================================

export const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, getKey(), iv);

  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),

    cipher.final(),
  ]);

  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
};

// ==========================================================
// Decrypt Data
// ==========================================================

export const decrypt = (encryptedText: string): string => {
  const parts = encryptedText.split(":");

  if (parts.length !== 2) {
    throw new Error("Invalid encrypted data format");
  }

  const [iv, encrypted] = parts;

  const decipher = crypto.createDecipheriv(
    algorithm,

    getKey(),

    Buffer.from(iv, "hex"),
  );

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encrypted, "hex")),

    decipher.final(),
  ]);

  return decrypted.toString("utf8");
};
