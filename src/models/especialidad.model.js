import { model, Schema } from "mongoose";

const especialidadSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
}, { timestamps: true });

const Especialidad = model("Especialidad", especialidadSchema);
export default Especialidad;
