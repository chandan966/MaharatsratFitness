import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const plans = [
  { slug: "basic", name: "Basic", description: "A strong start with the essentials.", monthlyPricePaise: 99900, yearlyPricePaise: 999000, features: ["Gym access", "Locker access", "General workout plan"] },
  { slug: "pro", name: "Pro", description: "More coaching, classes, and support.", monthlyPricePaise: 199900, yearlyPricePaise: 1999000, features: ["Unlimited gym access", "Group classes", "Personal workout plan", "Diet guidance", "Progress tracking"], isFeatured: true },
  { slug: "elite", name: "Elite", description: "Personal coaching for your biggest goals.", monthlyPricePaise: 399900, yearlyPricePaise: 3999000, features: ["Everything in Pro", "Personal trainer", "Personalized diet", "One-on-one sessions", "Priority support"] }
];

const programs = [
  { slug: "strength-training", name: "Strength Training", description: "Progressive strength coaching for lasting results.", level: "All levels", durationMinutes: 60, imageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=80" },
  { slug: "conditioning", name: "Conditioning", description: "Build endurance with smart, high-energy intervals.", level: "All levels", durationMinutes: 45, imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80" },
  { slug: "yoga-mobility", name: "Yoga & Mobility", description: "Move freely, recover well, and build a stronger base.", level: "Beginner", durationMinutes: 50, imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80" },
  { slug: "functional-fitness", name: "Functional Fitness", description: "Practical strength and power for everyday movement.", level: "Intermediate", durationMinutes: 50, imageUrl: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=900&q=80" },
  { slug: "boxing", name: "Boxing", description: "Technique, conditioning, and confidence in every round.", level: "All levels", durationMinutes: 45, imageUrl: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=900&q=80" },
  { slug: "dance-fitness", name: "Dance Fitness", description: "Upbeat group sessions that make cardio feel natural.", level: "All levels", durationMinutes: 45, imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80" }
];

const trainers = [
  { slug: "rahul-patil", name: "Rahul Patil", title: "Strength Coach", bio: "Rahul helps members build strength with patient coaching, clear progressions, and a focus on good technique.", specializations: ["Strength", "Muscle building"], certifications: ["Certified Personal Trainer"], experienceYears: 8, rating: 4.9, clientCount: 120, imageUrl: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=900&q=80" },
  { slug: "priya-shah", name: "Priya Shah", title: "Yoga & Mobility Coach", bio: "Priya brings practical mobility and mindful movement into training plans for all experience levels.", specializations: ["Yoga", "Mobility"], certifications: ["RYT-200"], experienceYears: 6, rating: 4.9, clientCount: 84, imageUrl: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=900&q=80" },
  { slug: "amit-kulkarni", name: "Amit Kulkarni", title: "Functional Fitness Coach", bio: "Amit combines conditioning and functional strength for people who want training that carries into daily life.", specializations: ["Conditioning", "Functional fitness"], certifications: ["CrossFit Level 1"], experienceYears: 7, rating: 4.8, clientCount: 96, imageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=80" }
];

const classSeeds = [
  { slug: "morning-strength", name: "Morning Strength", programSlug: "strength-training", trainerSlug: "rahul-patil", level: "Intermediate", hour: 6, minute: 0 },
  { slug: "sunrise-mobility", name: "Sunrise Mobility", programSlug: "yoga-mobility", trainerSlug: "priya-shah", level: "Beginner", hour: 7, minute: 30 },
  { slug: "evening-conditioning", name: "Evening Conditioning", programSlug: "conditioning", trainerSlug: "amit-kulkarni", level: "Advanced", hour: 18, minute: 0 },
  { slug: "dance-fitness", name: "Dance Fitness", programSlug: "dance-fitness", trainerSlug: "priya-shah", level: "All levels", hour: 19, minute: 30 }
];

async function main() {
  for (const plan of plans) {
    const { slug, ...data } = plan;
    await prisma.membershipPlan.upsert({ where: { slug }, update: data, create: { slug, ...data } });
  }
  for (const program of programs) {
    const { slug, ...data } = program;
    await prisma.program.upsert({ where: { slug }, update: data, create: { slug, ...data } });
  }
  for (const trainer of trainers) {
    const { slug, ...data } = trainer;
    await prisma.trainer.upsert({ where: { slug }, update: data, create: { slug, ...data } });
  }

  for (const item of classSeeds) {
    const program = await prisma.program.findUniqueOrThrow({ where: { slug: item.programSlug } });
    const trainer = await prisma.trainer.findUniqueOrThrow({ where: { slug: item.trainerSlug } });
    const fitnessClass = await prisma.fitnessClass.upsert({
      where: { slug: item.slug },
      update: { name: item.name, programId: program.id, trainerId: trainer.id, level: item.level },
      create: { slug: item.slug, name: item.name, description: program.description, programId: program.id, trainerId: trainer.id, level: item.level }
    });

    for (let day = 1; day <= 14; day += 1) {
      const date = new Date();
      date.setUTCDate(date.getUTCDate() + day);
      const startsAt = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), item.hour, item.minute));
      const endsAt = new Date(startsAt.getTime() + program.durationMinutes * 60_000);
      await prisma.classSchedule.upsert({
        where: { fitnessClassId_startsAt: { fitnessClassId: fitnessClass.id, startsAt } },
        update: { endsAt, capacity: 20 },
        create: { fitnessClassId: fitnessClass.id, startsAt, endsAt, capacity: 20, room: "Main Studio" }
      });
    }
  }

  const email = process.env.SEED_ADMIN_EMAIL ?? "admin@creafitness.local";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "CreaDev!2026";
  if (process.env.NODE_ENV === "production" && (!process.env.SEED_ADMIN_PASSWORD || !process.env.SEED_ADMIN_EMAIL)) {
    throw new Error("Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD before production seeding.");
  }
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.upsert({
    where: { email },
    update: { name: "Crea Admin", role: "ADMIN", passwordHash },
    create: { name: "Crea Admin", email, role: "ADMIN", passwordHash }
  });

  console.log("Seeded membership plans, programs, trainers, class schedules, and the local admin account.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
