import Role from "../models/roles.model.js";
import User from "../models/user.model.js";

export const isAdmin = async (req, res, next) => {
  try {
    const userDB = await User.findById(req.userId).populate("role");
    if (!userDB) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (userDB.role?.nombre !== "admin") {
      return res
        .status(403)
        .json({ message: "Permiso denegado: requiere rol admin" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
export const isMedio = async (req, res, next) => {
  try {
    const userDB = await User.findById(req.userId).populate("role");
    if (!userDB) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (userDB.role?.nombre !== "medico") {
      return res
        .status(403)
        .json({ message: "Permiso denegado: requiere rol admin" });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Error interno del servidor" });
  }
};
