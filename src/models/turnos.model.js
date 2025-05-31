import { model, Schema, Types } from "mongoose";

const turnosSchema = new Schema({
  hora: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^([01]\d|2[0-3]):[0-5]\d$/.test(v), // formato HH:mm
      message: "La hora debe tener el formato HH:mm",
    },
  },
  fecha: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^\d{4}-\d{2}-\d{2}$/.test(v), // formato YYYY-MM-DD
      message: "La fecha debe tener el formato YYYY-MM-DD",
    },
  },
  medico: {
    type: Types.ObjectId,
    ref: "Medico",
    required: true,
  },
  nombrePaciente: {
    type: String,
    required: true,
    trim: true,
  },
  apellidoPaciente: {
    type: String,
    required: true,
    trim: true,
  },
  telPaciente: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^[0-9]{7,15}$/.test(v),
      message: "El teléfono debe tener entre 7 y 15 dígitos",
    },
  },
}, { timestamps: true });

const Turno = model("Turno", turnosSchema);
export default Turno;
