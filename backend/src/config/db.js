// src/config/db.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Optional: Log queries in development
if (process.env.NODE_ENV === "development") {
  prisma.$on("query", (e) => {
    console.log("Prisma Query: ", e.query);
  });
}

export default prisma;
