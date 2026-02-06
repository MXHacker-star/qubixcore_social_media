import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const AUTH_SECRET = process.env.AUTH_SECRET ?? "change-me";
const encoder = new TextEncoder();

export type SessionPayload = {
  sub: string;
  email: string;
  role: string;
  name: string;
};

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSessionToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encoder.encode(AUTH_SECRET));
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, encoder.encode(AUTH_SECRET));
  return payload as SessionPayload;
}

export async function safeVerifySessionToken(token?: string) {
  if (!token) return null;
  try {
    return await verifySessionToken(token);
  } catch {
    return null;
  }
}
