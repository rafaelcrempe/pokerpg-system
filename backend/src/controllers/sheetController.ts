import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";

export async function createSheet(request: FastifyRequest,reply: FastifyReply) {
  const body = request.body as {
    formId: string;
  };

  const { formId } = body;

  try {
    const sheet = await prisma.pokemonSheet.create({
      data: {
        formId,
        ownerUserId: request.user.id,
      },
    });

    return reply.status(201).send({
      message: "Ficha criada com sucesso!",
      data: sheet,
    });
  } catch (error) {
    console.error("Erro ao criar ficha:", error);

    return reply.status(500).send({
      error: "Internal Server Error",
      message: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
    });
  }
}


