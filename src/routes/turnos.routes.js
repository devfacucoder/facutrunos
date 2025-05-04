import {Router} from "express"

const turnosRoutes = Router();
import * as ctrlTurnos from "../controllers/turnos.ctrl.js"
//turnosRoutes.get("/ver-lista")
turnosRoutes.post("/reservar",ctrlTurnos.reservarTurno)

export default turnosRoutes;