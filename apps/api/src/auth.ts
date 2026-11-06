import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "./config.js";

const COOKIE_NAME = "crea_session";
const SESSION_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export function setSession(res: Response, userId: string, role: "MEMBER" | "TRAINER" | "ADMIN") {
  const token = jwt.sign({ role }, env.JWT_SECRET, { subject: userId, expiresIn: "7d" });
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_AGE_MS
  });
}

export function clearSession(res: Response) {
  res.clearCookie(COOKIE_NAME, { httpOnly: true, secure: env.NODE_ENV === "production", sameSite: "lax", path: "/" });
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.[COOKIE_NAME] as string | undefined;
  if (!token) return res.status(401).json({ error: "Please sign in to continue." });

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload & { role?: "MEMBER" | "TRAINER" | "ADMIN" };
    if (!payload.sub || !payload.role) return res.status(401).json({ error: "Your session is invalid. Please sign in again." });
    req.auth = { userId: payload.sub, role: payload.role };
    return next();
  } catch {
    return res.status(401).json({ error: "Your session has expired. Please sign in again." });
  }
}

export function requireRole(...roles: Array<"MEMBER" | "TRAINER" | "ADMIN">) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.auth || !roles.includes(req.auth.role)) return res.status(403).json({ error: "You do not have access to this resource." });
    return next();
  };
}
