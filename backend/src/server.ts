import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { prisma } from './lib/prisma.js';
import { userRoutes } from './routes/userRoutes.js';


const app = Fastify();

// registrar plugins
await app.register(cors);
await app.register(userRoutes);

// rota básica
app.get('/', async () => {
  return { message: 'API funcionando' };
});

// teste de banco
app.get('/test-db', async () => {
  const result = await prisma.$queryRaw`SELECT 1`;
  return result;
});

// iniciar servidor
app.listen({ port: 3333 }).then(() => {
  console.log('Server running on http://localhost:3333');
});


