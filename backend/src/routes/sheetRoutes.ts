import { FastifyInstance } from "fastify";
import { createSheet, getMySheets, getSheetByID } from "../controllers/sheetController";
import { verifyToken } from "../middlewares/authMiddleware";

export async function sheetRoutes(app: FastifyInstance) {
    app.post("/sheets", { preHandler: verifyToken }, createSheet);

    app.get("/my-sheets", { preHandler: verifyToken }, getMySheets);
    app.get("/sheets/:id", { preHandler: verifyToken }, getSheetByID);

}