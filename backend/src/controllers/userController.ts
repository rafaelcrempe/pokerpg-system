import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";


export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const body = request.body as {
    name: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
  };

  const { name, lastName, username, email, password } = body;

  const existingUsername = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUsername) {
    return reply.status(409).send({
      error: "Conflict",
      message: "Nome de Usuário já cadastrado.",
    });
  }

  const existingEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (existingEmail) {
    return reply.status(409).send({
      error: "Conflict",
      message: "E-mail já registrado.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
      data: {
        name,
        lastName,
        password: hashedPassword,
        username,
        email
      },
    });

  return reply.status(201).send({
    message: "Usuário criado com sucesso!",
    data:user,
  });
}
