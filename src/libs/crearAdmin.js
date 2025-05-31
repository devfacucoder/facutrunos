import User from "../models/user.model.js";
import Role from "../models/roles.model.js";
import config from "../config.js";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789", 4);

const createAdmin = async () => {
  try {
    // Buscar si ya existe un usuario con rol "admin"
    const adminRole = await Role.findOne({ nombre: "admin" });
    if (!adminRole) {
      console.error(
        "Rol 'admin' no encontrado. Asegúrate de que exista en la base de datos."
      );
      return;
    }

    const existingAdmin = await User.findOne({ role: adminRole._id });

    if (existingAdmin) {
      console.log("Admin ya existe. No se necesita crear uno nuevo.");
      return;
    }

    // Crear nuevo admin
    const newAdmin = new User({
      nombre: config.nombreAd,
      apellido: config.apeAd,
      role: adminRole._id,
      codAcess: nanoid(),
      password: await User.enCryptPassword(config.passAdmin),
      tipoDeMedico: "", // O un valor válido si es requerido
    });

    await newAdmin.save();
    console.log("Admin creado exitosamente el cod es: " + newAdmin.codAcess);
  } catch (error) {
    console.error("Error al crear el admin:", error);
  }
};

export default createAdmin;
