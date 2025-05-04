import { model, Schema, Types } from "mongoose";

const medicoSchema = new Schema({
  nombreMedico: {
    type: String,
    required: true,
    trim: true,
  },
  apellidoMedico: {
    type: String,
    required: true,
    trim: true,
  },
  tipoDeMedico: {
    type: Schema.Types.ObjectId,
    ref: "Especialidad",
    required: true
  },
  turnos: [
    {
      type: Types.ObjectId,
      ref: "Turno",
    },
  ],
  password: {
    type: String,
    required: true,
    select: false, // para que no se devuelva por defecto en consultas
  },
}, { timestamps: true });

const Medico = model("Medico", medicoSchema);
export default Medico;
