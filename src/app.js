import express from "express";
const app = express();
import cors from "cors";
import mongoose from "./dataBase.js";

//*import toures
import medicosRoutes from "./routes/medicos.routes.js";
import turnosRoutes from "./routes/turnos.routes.js";
import authRoutes from "./routes/auth.routes.js";

//*import Libs
import crearEspecialidades from "./libs/crearEspecialidades.js";
import inicializarRoles from "./libs/crearRoles.js";
import createAdmin from "./libs/crearAdmin.js";
crearEspecialidades();
inicializarRoles();
createAdmin();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/medico", medicosRoutes);
app.use("/api/turnos", turnosRoutes);

app.get("/", (req, res) => {
  res.send("FacuTurnos");
});

export default app;
