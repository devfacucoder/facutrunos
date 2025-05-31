import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config.js";
export const login = async (req, res) => {
  try {
    const { cod, password } = req.body;
    const userDB = await User.findOne({ codAcess: cod }).select("+password");
    if (!userDB) {
      return res
        .status(504)
        .json({ menssage: "El código o la contraseña son incorrectos" });
    }

    const passwordValida = await userDB.comparePassword(password);
    if (!passwordValida) {
      return res
        .status(504)
        .json({ menssage: "El código o la contraseña son incorrectos" });
    }
    const token = jwt.sign({ id: userDB._id }, config.secret, {
      expiresIn: "5h", // opcional: tiempo de expiración
    });
    res.status(200).json({ menssage: "Usuario Logeado", token });
  } catch (error) {
    console.log(error);
  }
};
