import { model, Schema } from "mongoose";

const roleSchema = new Schema(
  {
    nombre: {
      type: String,
      enum: ["admin", "medico"],
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Role = model("Role", roleSchema);

export default Role;
