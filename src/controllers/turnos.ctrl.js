import Turnos from "../models/turnos.model.js";
import Medico from "../models/medico.model.js";
export const reservarTurno = async (req, res) => {
  try {
    const {
      nombrePaciente,
      apellidoPaciente,
      telPaciente,
      medico,
      fecha,
      hora,
    } = req.body;
    const medicoAreservar = await Medico.findOne({ _id: medico })
   // Creamos y guardamos el turno
   const newTurno = await Turnos.create({
    nombrePaciente,
    apellidoPaciente,
    telPaciente,
    medico, // solo se necesita el ID
    fecha,
    hora,
  });
    await Medico.findByIdAndUpdate(medico, {
      $push: { turnos: newTurno._id },
    });

    res.status(200).json({ menssage: "Turno Reservado", objTurno: newTurno });
  } catch (error) {
    console.log(error);
  }
};
