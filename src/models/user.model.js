import { model, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    codAcess: {
      type: String,
      require: true,
      unique: true,
    },
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    apellido: {
      type: String,
      required: true,
      trim: true,
    },
    tipoDeMedico: {
      type: String,
    },
    role: {
      type: Types.ObjectId,
      ref: "Role",
      required: true,
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
  },
  { timestamps: true }
);
userSchema.statics.enCryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
userSchema.methods.comparePassword = async function (passwordTextoPlano) {
  return await bcrypt.compare(passwordTextoPlano, this.password);
};
const User = model("User", userSchema);
export default User;
