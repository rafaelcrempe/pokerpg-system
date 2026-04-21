import { FastifyInstance } from 'fastify';
import { createUser } from '../controllers/userController.js';

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', createUser);
}
