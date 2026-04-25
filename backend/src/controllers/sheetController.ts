import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";

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
      data: sheets,
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
      data: sheet,
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

    const body = request.body as {
      nickname?: string | null;
      level?: number;
      xp?: number;
      natureId?: string | null;
      gender?: "MALE" | "FEMALE" | "GENDERLESS" | null;
      heldItemName?: string | null;
      abilityName?: string | null;
      notes?: string | null;
      currentHp?: number | null;
      damageTaken?: number;
      isShiny?: boolean;
      canDynamax?: boolean;
      canGigantamax?: boolean;
    };

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
        message: "Você não tem permissão para editar esta ficha.",
      });
    }

    const updatedSheet = await prisma.pokemonSheet.update({
      where: { id },
      data: {
        nickname: body.nickname,
        level: body.level,
        xp: body.xp,
        natureId: body.natureId,
        gender: body.gender,
        heldItemName: body.heldItemName,
        abilityName: body.abilityName,
        notes: body.notes,
        currentHp: body.currentHp,
        damageTaken: body.damageTaken,
        isShiny: body.isShiny,
        canDynamax: body.canDynamax,
        canGigantamax: body.canGigantamax,
      },
      include: {
        form: {
          include: {
            species: true,
          },
        },
        nature: true,
      },
    });

    return reply.status(200).send({
      message: "Ficha atualizada com sucesso.",
      data: updatedSheet,
    });
  } catch (error) {
    console.error("Erro ao atualizar ficha:", error);

    return reply.status(500).send({
      error: "Internal Server Error",
      message: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
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