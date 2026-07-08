import crypto from "crypto";

export function generateResetToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function getResetTokenExpiry() {
  // 15 Minutes
  return new Date(Date.now() + 15 * 60 * 1000);
}