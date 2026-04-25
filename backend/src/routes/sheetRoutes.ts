import { FastifyInstance } from "fastify";
import { createSheet, getMySheets, getSheetByID, patchSheet, deleteSheet } from "../controllers/sheetController";
import { verifyToken } from "../middlewares/authMiddleware";

export async function sheetRoutes(app: FastifyInstance) {
    app.post("/sheets", { preHandler: verifyToken }, createSheet);

    app.get("/my-sheets", { preHandler: verifyToken }, getMySheets);
    app.get("/sheets/:id", { preHandler: verifyToken }, getSheetByID);

    app.patch("/sheets/:id", { preHandler: verifyToken }, patchSheet);

    app.delete("/sheets/:id", { preHandler: verifyToken }, deleteSheet);
}