import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const body = request.body as {
    name: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
  };

  const { name, lastName, username, email, password } = body;

  try {
    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUsername) {
      return reply.status(409).send({
        error: "Conflict",
        message: "Nome de Usuário já cadastrado.",
      });
    }

    const existingEmail = await prisma.user.findUnique({ where: { email } });
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
        email,
      },
    });

    return reply.status(201).send({
      message: "Usuário criado com sucesso!",
      data: {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);

    return reply.status(500).send({
      error: "Internal Server Error",
      message: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
    });
  }
}

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const body = request.body as {
    username: string;
    password: string;
  };

  const { username, password } = body;

  try {
    const u = await prisma.user.findUnique({
      where: { username },
    });

    if (!u) {
      return reply.status(401).send({
        error: "Credenciais inválidas",
        message: "Username ou senha incorretos.",
      });
    }

    const p = await bcrypt.compare(password, u.password);

    if (!p) {
      return reply.status(401).send({
        error: "Credenciais inválidas",
        message: "Username ou senha incorretos.",
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET não configurado.");
    }

    const token = jwt.sign(
      {
        role: u.role,
        username: u.username,
      },
      process.env.JWT_SECRET,
      {
        subject: u.id,
        expiresIn: "120d",
      },
    );

    return reply.status(200).send({
      message: "Login realizado com sucesso.",
      token,
      user: {
        id: u.id,
        name: u.name,
        lastName: u.lastName,
        username: u.username,
        email: u.email,
        role: u.role,
      },
    });
  } catch (error) {
    console.error("Erro ao efetuar login", error);

    return reply.status(500).send({
      error: "Internal Server Error",
      message: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
    });
  }
}

export async function getMe(request: FastifyRequest, reply: FastifyReply) {
  try {
    const userId = request.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        lastName: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return reply.status(404).send({
        error: "Not Found",
        message: "Usuário não encontrado.",
      });
    }

    return reply.status(200).send({
      user,
    });
  } catch (error) {
    console.error("Erro ao recuperar dados do usuário:", error);

    return reply.status(500).send({
      error: "Internal Server Error",
      message: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
    });
  }
}

