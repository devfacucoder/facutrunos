import Role from "../models/roles.model.js"; // Ajusta la ruta según tu estructura

const inicializarRoles = async () => {
  try {
    const rolesDeseados = ["admin", "medico"];

    for (const nombre of rolesDeseados) {
      const existe = await Role.findOne({ nombre });

      if (!existe) {
        await Role.create({ nombre });
        console.log(`Rol creado: ${nombre}`);
      } else {
        console.log(`El rol '${nombre}' ya existe.`);
      }
    }
  } catch (error) {
    console.error("Error al inicializar los roles:", error.message);
  }
};
export default inicializarRoles