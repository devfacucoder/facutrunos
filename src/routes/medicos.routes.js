import { Router } from "express";

const medicosRoutes = Router()
import * as ctrlMedico from "../controllers/medicos.ctrl.js";

import verifyToken from "../validators/verifyToken.js";
//medicosRoutes.get("/listaturnos/:id")
import {isAdmin} from "../validators/permisse.js"
medicosRoutes.get("/listamedicos/",ctrlMedico.getMedicos)
medicosRoutes.get("/:idmedico",ctrlMedico.obtenerMedicoPorID)
medicosRoutes.get("/listaturnos/:idmedico",ctrlMedico.listaturnos)
medicosRoutes.post("/agregarmedico",ctrlMedico.createMedico);
medicosRoutes.delete("/:idmedico",ctrlMedico.deleteMedico)


export default medicosRoutes;

//,[verifyToken,isAdmin]
