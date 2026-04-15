import Fastify from 'fastify';
import cors from '@fastify/cors';

const app = Fastify();

await app.register(cors);

app.get('/', async () => {
  return { message: 'API rodando 🚀' };
});

app.listen({ port: 3333 }).then(() => {
  console.log('Server running on http://localhost:3333');
});
