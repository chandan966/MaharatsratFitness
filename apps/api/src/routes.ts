import { Router } from "express";
import { Prisma, Role } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { rateLimit } from "express-rate-limit";
import { clearSession, requireAuth, requireRole, setSession } from "./auth.js";
import { prisma } from "./prisma.js";

export const apiRouter = Router();
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: "draft-8", legacyHeaders: false });
const authRouter = Router();
apiRouter.use("/auth", authLimiter, authRouter);

const credentialsSchema = z.object({
  email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
  password: z.string().min(8).max(100)
});

authRouter.post("/register", async (req, res, next) => {
  const parsed = z.object({
    name: z.string().trim().min(2).max(80),
    email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
    password: z.string().min(8).max(100)
  }).safeParse(req.body);
  if (!parsed.success) return res.status(422).json({ error: "Check your name, email, and password.", details: parsed.error.flatten() });

  try {
    const passwordHash = await bcrypt.hash(parsed.data.password, 12);
    const user = await prisma.user.create({
      data: { name: parsed.data.name, email: parsed.data.email, passwordHash, role: Role.MEMBER },
      select: { id: true, name: true, email: true, role: true }
    });
    setSession(res, user.id, user.role);
    return res.status(201).json({ user });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return res.status(409).json({ error: "An account with this email already exists." });
    }
    return next(error);
  }
});

authRouter.post("/login", async (req, res, next) => {
  const parsed = credentialsSchema.safeParse(req.body);
  if (!parsed.success) return res.status(422).json({ error: "Enter a valid email and password." });

  try {
    const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (!user || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) {
      return res.status(401).json({ error: "Email or password is incorrect." });
    }
    setSession(res, user.id, user.role);
    return res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    return next(error);
  }
});

authRouter.post("/logout", (_req, res) => {
  clearSession(res);
  return res.status(204).end();
});

authRouter.get("/me", requireAuth, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.auth!.userId },
      select: { id: true, name: true, email: true, role: true, phone: true, createdAt: true }
    });
    if (!user) return res.status(401).json({ error: "Account was not found." });
    return res.json({ user });
  } catch (error) {
    return next(error);
  }
});

apiRouter.get("/health", async (_req, res, next) => {
  try {
    await prisma.$queryRawUnsafe("SELECT 1");
    return res.json({ status: "ok", database: "connected" });
  } catch (error) {
    return next(error);
  }
});

apiRouter.get("/programs", async (_req, res, next) => {
  try {
    const data = await prisma.program.findMany({ where: { isActive: true }, orderBy: { name: "asc" } });
    return res.json({ data });
  } catch (error) {
    return next(error);
  }
});

apiRouter.get("/trainers", async (_req, res, next) => {
  try {
    const data = await prisma.trainer.findMany({ where: { isActive: true }, orderBy: { name: "asc" } });
    return res.json({ data });
  } catch (error) {
    return next(error);
  }
});

apiRouter.get("/memberships", async (_req, res, next) => {
  try {
    const data = await prisma.membershipPlan.findMany({ where: { isActive: true }, orderBy: { monthlyPricePaise: "asc" } });
    return res.json({ data });
  } catch (error) {
    return next(error);
  }
});

apiRouter.get("/schedules", async (req, res, next) => {
  try {
    const from = req.query.from ? new Date(String(req.query.from)) : new Date();
    if (Number.isNaN(from.getTime())) return res.status(422).json({ error: "The from date is invalid." });
    const schedules = await prisma.classSchedule.findMany({
      where: { startsAt: { gte: from } },
      include: { fitnessClass: { include: { trainer: true, program: true } } },
      orderBy: { startsAt: "asc" },
      take: 100
    });
    const data = schedules.map((item) => ({
      id: item.id,
      startsAt: item.startsAt,
      endsAt: item.endsAt,
      capacity: item.capacity,
      spotsRemaining: Math.max(0, item.capacity - item.bookingsCount),
      room: item.room,
      name: item.fitnessClass.name,
      level: item.fitnessClass.level,
      program: item.fitnessClass.program.name,
      trainer: item.fitnessClass.trainer.name
    }));
    return res.json({ data });
  } catch (error) {
    return next(error);
  }
});

const bookingSchema = z.object({ scheduleId: z.string().min(1).max(80) });
apiRouter.post("/bookings", requireAuth, async (req, res, next) => {
  const parsed = bookingSchema.safeParse(req.body);
  if (!parsed.success) return res.status(422).json({ error: "Choose a class time to book." });

  try {
    const booking = await prisma.$transaction(async (tx) => {
      const schedule = await tx.classSchedule.findUnique({ where: { id: parsed.data.scheduleId } });
      if (!schedule || schedule.startsAt <= new Date()) throw new Error("SCHEDULE_UNAVAILABLE");
      const seat = await tx.classSchedule.updateMany({
        where: { id: schedule.id, bookingsCount: { lt: schedule.capacity } },
        data: { bookingsCount: { increment: 1 } }
      });
      if (seat.count === 0) throw new Error("CLASS_FULL");
      return tx.booking.create({
        data: { memberId: req.auth!.userId, scheduleId: schedule.id },
        include: { schedule: { include: { fitnessClass: true } } }
      });
    });
    return res.status(201).json({ booking });
  } catch (error) {
    if (error instanceof Error && error.message === "CLASS_FULL") return res.status(409).json({ error: "This class is full." });
    if (error instanceof Error && error.message === "SCHEDULE_UNAVAILABLE") return res.status(404).json({ error: "This class time is no longer available." });
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") return res.status(409).json({ error: "You already booked this class." });
    return next(error);
  }
});

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(32).optional(),
  subject: z.string().trim().min(2).max(120),
  message: z.string().trim().min(10).max(4000)
});
apiRouter.post("/contact", async (req, res, next) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) return res.status(422).json({ error: "Please complete each contact field.", details: parsed.error.flatten() });
  try {
    const message = await prisma.contactMessage.create({ data: parsed.data });
    return res.status(201).json({ message: "Thanks. Your message has been sent.", id: message.id });
  } catch (error) {
    return next(error);
  }
});

apiRouter.get("/admin/overview", requireAuth, requireRole("ADMIN"), async (_req, res, next) => {
  try {
    const [members, activeSubscriptions, todayBookings, pendingMessages] = await Promise.all([
      prisma.user.count({ where: { role: Role.MEMBER } }),
      prisma.membershipSubscription.count({ where: { status: "ACTIVE" } }),
      prisma.booking.count({ where: { createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } } }),
      prisma.contactMessage.count({ where: { repliedAt: null } })
    ]);
    return res.json({ members, activeSubscriptions, todayBookings, pendingMessages });
  } catch (error) {
    return next(error);
  }
});
