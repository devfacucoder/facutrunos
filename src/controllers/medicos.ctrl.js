import Medico from "../models/medico.model.js";
import Especialidad from "../models/especialidad.model.js";
import Turnos from "../models/turnos.model.js";
export const createMedico = async (req, res) => {
  try {
    const { nombreMedico, apellidoMedico, password, tipoDeMedico } = req.body;

    const newMedico = new Medico({
      nombreMedico,
      apellidoMedico,
      password,
      tipoDeMedico: await Especialidad.findOne({ nombre: tipoDeMedico }), //TODO  crear algo para que verifique si la esp existe
    });
    console.log(await Especialidad.findOne({ nombre: tipoDeMedico }));
    const saveMedico = await newMedico.save();

    res
      .status(200)
      .json({ menssage: "Profesional Creado", objMedico: saveMedico });
  } catch (error) {
    console.log(error);
  }
};
export const getMedicos = async (req, res) => {
  try {
    const medicosDB = await Medico.find();
    res
      .status(201)
      .json({ menssage: "Lista de Medicos", listaMedicos: medicosDB });
  } catch (error) {
    console.log(error);
  }
};

export const listaturnos = async (req, res) => {
  try {
    const { idmedico } = req.params;

    // Buscar al médico y popular automáticamente los turnos
    const medicoDB = await Medico.findById(idmedico).populate("turnos");

    if (!medicoDB) {
      return res.status(404).json({ message: "Médico no encontrado" });
    }

    res.status(200).json({
      message: "La lista se envió correctamente",
      objLista: medicoDB.turnos,
    });
  } catch (error) {
    console.error(error); // corregido "consoel" -> "console"
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
