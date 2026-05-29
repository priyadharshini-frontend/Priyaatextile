import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../prisma/generated/db";

const prismaClientSingleton = () => {
  return new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    }),
  });
};

declare global {
  var prismaGlobalDB: ReturnType<typeof prismaClientSingleton> | undefined;
}

const db = globalThis.prismaGlobalDB ?? prismaClientSingleton();

export default db;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobalDB = db;
