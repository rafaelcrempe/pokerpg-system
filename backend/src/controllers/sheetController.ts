import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import { calculateSheet } from "../services/pokemonSheetCalculator";
import { buildSheetResponse } from "../builders/buildSheetResponse";

export async function createSheet(request: FastifyRequest, reply: FastifyReply) {
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

export async function getMySheets(request: FastifyRequest, reply: FastifyReply) {
  try {
    const ownerUserId = request.user.id;

    const sheets = await prisma.pokemonSheet.findMany({
      where: { ownerUserId },
      include: {
        form: {
          include: {
            species: true,
          },
        },
      },
    });

    return reply.status(200).send({
      data: sheets.map(buildSheetResponse),
    });

  } catch (error) {
    console.error("Erro ao recuperar fichas do jogador:", error);

    return reply.status(500).send({
      error: "Internal Server Error",
      message: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
    });
  }
}

export async function getSheetByID(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as { id: string };

    const sheet = await prisma.pokemonSheet.findUnique({
      where: { id },
      include: {
        form: {
          include: {
            species: true,
          },
        },
        nature: true,
        moves: true,
        conditions: true,
      },
    });

    if (!sheet) {
      return reply.status(404).send({
        error: "Not Found",
        message: "Ficha não encontrada.",
      });
    }

    const isAdmin = request.user.role === "ADMIN";
    const isOwner = sheet.ownerUserId === request.user.id;

    if (!isAdmin && !isOwner) {
      return reply.status(403).send({
        error: "Forbidden",
        message: "Usuário não possui permissão para acessar esta ficha.",
      });
    }

    return reply.status(200).send({
      data: buildSheetResponse(sheet),
    });

  } catch (error) {
    console.error("Erro ao buscar ficha:", error);

    return reply.status(500).send({
      error: "Internal Server Error",
      message: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
    });
  }
}

export async function patchSheet(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as { id: string };
    const body = request.body as Partial<any>;

    const existing = await prisma.pokemonSheet.findUnique({
      where: { id },
      include: {
        form: {
          include: {
            species: true,
          },
        },
        nature: true,
      },
    });

    if (!existing) {
      return reply.status(404).send({
        error: "Not Found",
        message: "Ficha não encontrada.",
      });
    }

    const isAdmin = request.user.role === "ADMIN";
    const isOwner = existing.ownerUserId === request.user.id;

    if (!isAdmin && !isOwner) {
      return reply.status(403).send({
        error: "Forbidden",
        message: "Você não tem permissão para editar esta ficha.",
      });
    }

    const mergedSheet = {
      ...existing,
      ...body,
    };

    // Valida regras da ficha antes de salvar
    calculateSheet(mergedSheet, existing.form);

    const updated = await prisma.pokemonSheet.update({
      where: { id },
      data: body,
      include: {
        form: {
          include: {
            species: true,
          },
        },
        nature: true,
        moves: true,
        conditions: true,
      },
    });

    return reply.status(200).send({
      message: "Ficha atualizada com sucesso.",
      data: buildSheetResponse(updated),
    });

  } catch (error: any) {
    console.error("Erro ao atualizar ficha:", error);

    return reply.status(400).send({
      error: "Bad Request",
      message: error.message || "Erro ao atualizar ficha.",
    });
  }
}

export async function deleteSheet(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as { id: string };

    const sheet = await prisma.pokemonSheet.findUnique({
      where: { id },
    });

    if (!sheet) {
      return reply.status(404).send({
        error: "Not Found",
        message: "Ficha não encontrada.",
      });
    }

    const isAdmin = request.user.role === "ADMIN";
    const isOwner = sheet.ownerUserId === request.user.id;

    if (!isAdmin && !isOwner) {
      return reply.status(403).send({
        error: "Forbidden",
        message: "Você não tem permissão para apagar esta ficha.",
      });
    }

    await prisma.pokemonSheet.delete({
      where: { id },
    });

    return reply.status(204).send({
      message: "Ficha apagada com sucesso."
    });
  } catch (error) {
    console.error("Erro ao apagar ficha:", error);

    return reply.status(500).send({
      error: "Internal Server Error",
      message: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
    });
  }
}