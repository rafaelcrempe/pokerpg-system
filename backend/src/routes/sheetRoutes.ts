import { FastifyInstance } from "fastify";
import { createSheet } from "../controllers/sheetController";
import { verifyToken } from "../middlewares/authMiddleware";

export async function sheetRoutes(app: FastifyInstance) {
    app.post("/sheets", { preHandler: verifyToken }, createSheet);

}