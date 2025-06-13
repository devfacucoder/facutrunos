import Turnos from "../models/turnos.model.js";
import User from "../models/user.model.js";

export const getAllTurnos = async (req, res) => {
  try {
    const turnosDB = await Turnos.find();

    res
      .status(200)
      .json({ message: "Lista de todos los turnos", objLista: turnosDB });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al reservar el turno" });
  }
};

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

    // Normalizar fecha y hora para evitar duplicados por formato
    const fechaNormalizada = new Date(fecha).toISOString().split("T")[0]; // YYYY-MM-DD
    const horaNormalizada = hora.padStart(5, "0"); // Asegura formato HH:MM

    // Verificar si ya existe un turno en ese día y hora con ese médico
    const turnoExistente = await Turnos.findOne({
      medico,
      fecha: fechaNormalizada,
      hora: horaNormalizada,
    });

    if (turnoExistente) {
      return res.status(400).json({
        message: "El turno ya está reservado para esa fecha y hora",
      });
    }

    // Creamos y guardamos el turno
    const newTurno = await Turnos.create({
      nombrePaciente,
      apellidoPaciente,
      telPaciente,
      medico,
      fecha: fechaNormalizada,
      hora: horaNormalizada,
    });

    // Vinculamos el turno con el médico
    await User.findByIdAndUpdate(medico, {
      $push: { turnos: newTurno._id },
    });

    res.status(200).json({
      message: "Turno reservado",
      objTurno: newTurno,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al reservar el turno" });
  }
};
export const editTurnos = async (req, res) => {
  try {
    const { idturnos } = req.params;
    const { ...camposParaActualizar } = req.body;

    const turnoActualizado = await Turnos.findByIdAndUpdate(
      idturnos,
      camposParaActualizar,
      { new: true } // para devolver el documento actualizado
    );

    res
      .status(200)
      .json({ message: "turno Actualizado", objTurno: turnoActualizado });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al editar" });
  }
};

export const deleteTurnos = async (req, res) => {
  try {
    const turnoId = req.params.idturnos;
    const turno = await Turnos.findById(turnoId);
    if (!turno) {
      return res.status(404).json({ message: "Turno no encontrado" });
    }
    // Eliminar el turno
    await Turnos.findByIdAndDelete(turnoId);
    // Eliminar la referencia del turno en el médico
    await User.findByIdAndUpdate(turno.medico, {
      $pull: { turnos: turnoId },
    });
    res.status(200).json({ message: "Turno eliminado" });
  } catch (error) {
    console.log(error);
  }
};
