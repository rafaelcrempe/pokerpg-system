import "fastify";
import { Role } from "@prisma/client";

declare module "fastify" {
  interface FastifyRequest {
    user: {
      id: string;
      role: Role;
      username: string;
    };
  }
}
