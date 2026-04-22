import { FastifyInstance } from 'fastify';
import { createUser, login } from '../controllers/userController.js';

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', createUser);
  app.post('/login', login);
}
