import User from "../models/user.model.js";
import Especialidad from "../models/especialidad.model.js";
import Turnos from "../models/turnos.model.js";
import Role from "../models/roles.model.js";

import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("0123456789", 4);
const especializaciones = [
  "Clínico general",
  "Pediatra",
  "Ginecólogo",
  "Dermatólogo",
  "Cardiólogo",
  "Neurólogo",
  "Traumatólogo",
  "Oftalmólogo",
  "Odontólogo", // Dentista
  "Otorrinolaringólogo", // Oídos, nariz, garganta
  "Endocrinólogo",
  "Reumatólogo",
  "Urólogo",
  "Gastroenterólogo",
  "Oncólogo",
  "Psiquiatra",
  "Psicólogo",
  "Alergólogo",
  "Hematólogo",
  "Nefrólogo",
  "Infectólogo",
  "Neumonólogo",
  "Nutricionista",
  "Fisiatra",
  "Cirujano general",
  "Cirujano plástico",
  "Médico del deporte",
];
export const createMedico = async (req, res) => {
  try {
    const { nombreMedico, apellidoMedico, password, tipoDeMedico } = req.body;
    const esp = especializaciones.find((e) => e == tipoDeMedico);
    if (!esp) {
      return res
        .status(404)
        .json({ menssage: "la especializacion no existe o es incorrecta" });
    }
    const newMedico = new User({
      codAcess: nanoid(),
      nombre: nombreMedico,
      apellido: apellidoMedico,
      password: await User.enCryptPassword(password),
      role: await Role.findOne({ nombre: "medico" }),
      tipoDeMedico: tipoDeMedico,
    });
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
    const medicosDB = await User.find();
    const listamedicos = medicosDB.filter(e=> e.tipoDeMedico != "" )
    
    res
      .status(201)
      .json({ menssage: "Lista de Medicos", listamedicos:listamedicos });
  } catch (error) {
    console.log(error);
  }
};
export const obtenerMedicoPorID = async (req,res) =>{
  try {
    const {idmedico} = req.params
    const medicoDB = await User.findOne({_id:idmedico})
    if(medicoDB.tipoDeMedico == ""){
      return res.status(504).json({menssage:"Esto no es un medico"})
    }
    res.status(200).json({menssage:"usurio Encontrado",objMedico:medicoDB})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

export const listaturnos = async (req, res) => {
  try {
    const { idmedico } = req.params;

    // Buscar al médico y popular automáticamente los turnos
    const medicoDB = await User.findById(idmedico).populate("turnos");

    if (!medicoDB) {
      return res.status(404).json({ message: "Médico no encontrado" });
    }

    res.status(200).json({
      message: "La lista se envió correctamente",
      objLista: medicoDB.turnos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
export const getHorariosDisponibles = async (req, res) => {
  try {
    const { idmedico } = req.params;
    const { fecha } = req.query;

    if (!fecha) {
      return res.status(400).json({ message: "Debe proporcionar una fecha" });
    }

    // Verificamos que el médico exista
    const medico = await User.findById(idmedico);
    if (!medico) {
      return res.status(404).json({ message: "Médico no encontrado" });
    }

    // Obtenemos los turnos del médico para esa fecha
    const turnosDelDia = await Turnos.find({ medico: idmedico, fecha }).select(
      "hora"
    );

    // Horas ocupadas
    const horasOcupadas = turnosDelDia.map((turno) => turno.hora);

    // Generamos todos los horarios disponibles de 8:00 a 16:00
    const generarHorarios = () => {
      const horarios = [];
      let hora = 8;
      let minuto = 0;

      while (hora < 16 || (hora === 16 && minuto === 0)) {
        const h = String(hora).padStart(2, "0");
        const m = String(minuto).padStart(2, "0");
        horarios.push(`${h}:${m}`);
        minuto += 30;
        if (minuto >= 60) {
          minuto = 0;
          hora++;
        }
      }

      return horarios;
    };

    const todosLosHorarios = generarHorarios();

    // Filtramos los que ya están ocupados
    const horariosDisponibles = todosLosHorarios.filter(
      (hora) => !horasOcupadas.includes(hora)
    );

    res.status(200).json({
      message: "Horarios disponibles",
      horariosDisponibles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
export const deleteMedico = async (req, res) => {
  try {
    const { idmedico } = req.params;

    if (!idmedico) {
      return res.status(400).json({ menssage: "No se proporcionó un ID" });
    }

    const medicoDB = await User.findById(idmedico);

    if (!medicoDB) {
      return res.status(404).json({ menssage: "No se encontró el médico" });
    }

    // Eliminar todos los turnos del médico
    await Turnos.deleteMany({ medico: idmedico });

    // Eliminar el médico
    await User.findByIdAndDelete(idmedico);

    res.status(200).json({ menssage: "El médico y sus turnos fueron eliminados correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
