import { Router } from "express";

const turnosRoutes = Router();
import * as ctrlTurnos from "../controllers/turnos.ctrl.js";
//turnosRoutes.get("/ver-lista")
import verifyToken from "../validators/verifyToken.js";
import { isAdmin } from "../validators/permisse.js";

turnosRoutes.get("/", [verifyToken, isAdmin], ctrlTurnos.getAllTurnos);
turnosRoutes.post(
  "/reservar",
  [verifyToken, isAdmin],
  ctrlTurnos.reservarTurno
);
turnosRoutes.put("/:idturnos", [verifyToken, isAdmin], ctrlTurnos.editTurnos);
turnosRoutes.delete(
  "/:idturnos",
  [verifyToken, isAdmin],
  ctrlTurnos.deleteTurnos
);
export default turnosRoutes;
