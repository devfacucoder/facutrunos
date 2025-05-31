import {Router} from "express"

const turnosRoutes = Router();
import * as ctrlTurnos from "../controllers/turnos.ctrl.js"
//turnosRoutes.get("/ver-lista")
import verifyToken from "../validators/verifyToken.js";
import {isAdmin} from "../validators/permisse.js"


turnosRoutes.post("/reservar",ctrlTurnos.reservarTurno)
turnosRoutes.put("/:idturnos",ctrlTurnos.editTurnos)
turnosRoutes.delete("/:idturnos",ctrlTurnos.deleteTurnos)
export default turnosRoutes;