import { Router } from "express";

const medicosRoutes = Router()
import * as ctrlMedico from "../controllers/medicos.ctrl.js";
//medicosRoutes.get("/listaturnos/:id")

medicosRoutes.get("/listamedicos/",ctrlMedico.getMedicos)
medicosRoutes.get("/listaturnos/:idmedico",ctrlMedico.listaturnos)
medicosRoutes.post("/agregarmedico",ctrlMedico.createMedico);
export default medicosRoutes;


