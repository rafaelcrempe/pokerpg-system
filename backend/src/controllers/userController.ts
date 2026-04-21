import { FastifyReply, FastifyRequest } from 'fastify';

export async function createUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = request.body as {
    name: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
  };

  return reply.send({
    message: 'Controller funcionando',
    received: body,
  });
}
