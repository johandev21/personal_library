import { PrismaClient } from "@/generated/prisma/client";

type TenantConfig = {
  databaseUrl: string;
};

export function createPrismaClient(config: TenantConfig): PrismaClient {
  return new PrismaClient({
    datasources: {
      db: {
        url: config.databaseUrl,
      },
    },
  });
}