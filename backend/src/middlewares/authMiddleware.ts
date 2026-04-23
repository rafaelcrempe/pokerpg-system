import { Role } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

export async function verifyToken(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authHeader = request.headers.authorization || "";

  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return reply.status(401).send({
      error: "Unauthorized",
      message: "Token não enviado.",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      sub: string;
      role: Role;
      username: string;
    };

    request.user = {
      id: payload.sub,
      role: payload.role,
      username: payload.username,
    };
  } catch (error) {
    return reply.status(403).send({
      error: "Forbidden",
      message: "Token inválido ou expirado.",
    });
  }
}
