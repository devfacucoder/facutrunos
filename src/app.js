import express from "express"
const app = express();
import crearEspecialidades from "./libs/crearEspecialidades.js";
import cors from "cors";
import mongoose from "./dataBase.js";

//*import toures
import medicosRoutes from "./routes/medicos.routes.js";
import turnosRoutes from "./routes/turnos.routes.js"
crearEspecialidades()
app.use(express.json())
app.use("/api/medico",medicosRoutes);
app.use("/api/turnos",turnosRoutes)


app.get("/",(req,res)=>{
    res.send("FacuTurnos")
})

export default app;
