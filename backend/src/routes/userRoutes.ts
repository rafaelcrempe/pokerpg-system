import { FastifyInstance } from "fastify";
import { createUser, login, getMe } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", createUser);
  app.post("/login", login);

  app.get("/me", {preHandler: verifyToken}, getMe);
}
