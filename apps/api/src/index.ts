import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config.js";
import { apiRouter } from "./routes.js";
import { prisma } from "./prisma.js";

const app = express();
app.disable("x-powered-by");
app.use(helmet());
app.use(cors({ origin: env.WEB_ORIGIN, credentials: true }));
app.use(express.json({ limit: "32kb" }));
app.use(cookieParser());

app.get("/", (_req, res) => res.json({ name: "Crea Maharatsrat Fitness API", docs: "/api/health" }));
app.use("/api", apiRouter);

app.use((_req, res) => res.status(404).json({ error: "Route not found." }));
app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  const message = env.NODE_ENV === "production" ? "Something went wrong." : error instanceof Error ? error.message : "Something went wrong.";
  res.status(500).json({ error: message });
});

const server = app.listen(env.PORT, "0.0.0.0", () => {
  console.log("Crea API listening on http://localhost:" + env.PORT);
});

async function shutdown() {
  server.close();
  await prisma.$disconnect();
  process.exit(0);
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
