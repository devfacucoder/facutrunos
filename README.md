### 📌 POST `/api/medicos/agregarmedico`

**Descripción:**  
Crea un nuevo médico en la base de datos. El campo `tipoDeMedico` debe coincidir con el nombre de una especialidad existente en la colección de especialidades.

**Body requerido:**
```json
{
  "nombreMedico": "Pedro",
  "apellidoMedico": "García",
  "password": "secreto123",
  "tipoDeMedico": "odontologo"
}
### 📌 GET `/api/medicos/listaturnos/:idmedico`

**Descripción:**  
Obtiene todos los turnos asociados a un médico específico mediante su ID. El resultado incluye el detalle de cada turno (nombre del paciente, hora, fecha, etc.).

**Parámetro de ruta requerido:**
- `idmedico`: ID del médico del cual se desean obtener los turnos.

**Ejemplo de solicitud:**

**Respuesta exitosa:**
```json
{
  "message": "La lista se envió correctamente",
  "objLista": [
    {
      "_id": "6630a771c3e9bb1c7a7d9f3b",
      "nombrePaciente": "Ana",
      "apellidoPaciente": "López",
      "telPaciente": 1122334455,
      "medico": "662f8e7355ecb20b7d93e948",
      "fecha": "12/04/2025",
      "hora": "09:00",
      "__v": 0
    },
    {
      "_id": "6630a772c3e9bb1c7a7d9f3c",
      "nombrePaciente": "Carlos",
      "apellidoPaciente": "Pérez",
      "telPaciente": 1199887766,
      "medico": "662f8e7355ecb20b7d93e948",
      "fecha": "12/04/2025",
      "hora": "09:30",
      "__v": 0
    }
  ]
}
### 📌 GET `/api/medicos/listamedicos/`

**Descripción:**  
Obtiene la lista completa de todos los médicos registrados en el sistema.

**Parámetros:**  
No requiere parámetros de ruta ni de consulta.

**Ejemplo de solicitud:**

**Respuesta exitosa:**
```json
{
  "menssage": "Lista de Medicos",
  "listaMedicos": [
    {
      "_id": "662f8e7355ecb20b7d93e948",
      "nombreMedico": "Juan",
      "apellidoMedico": "Pérez",
      "password": "hashedpassword123",
      "tipoDeMedico": {
        "_id": "662f8d3e55ecb20b7d93e941",
        "nombre": "odontologo"
      },
      "turnos": []
    },
    {
      "_id": "662f8e7355ecb20b7d93e949",
      "nombreMedico": "Laura",
      "apellidoMedico": "Gómez",
      "password": "hashedpassword456",
      "tipoDeMedico": {
        "_id": "662f8d3e55ecb20b7d93e942",
        "nombre": "ginecologo"
      },
      "turnos": []
    }
  ]
}

### 📌 POST `/api/turnos/reservar`

**Descripción:**  
Permite reservar un turno con un médico. Al reservar, se crea un nuevo documento en la colección de turnos y se actualiza el médico correspondiente agregando el ID del turno a su lista de turnos.

**Body (JSON):**
```json
{
  "nombrePaciente": "Carlos",
  "apellidoPaciente": "Ramírez",
  "telPaciente": 1123456789,
  "medico": "662f8e7355ecb20b7d93e948",  // ID del médico
  "fecha": "20/10/2025",                // Formato DD/MM/AAAA
  "hora": "09:00"
}
{
  "menssage": "Turno Reservado",
  "objTurno": {
    "_id": "6630a012a3f1b5a31e5b7f10",
    "nombrePaciente": "Carlos",
    "apellidoPaciente": "Ramírez",
    "telPaciente": 1123456789,
    "medico": "662f8e7355ecb20b7d93e948",
    "fecha": "20/10/2025",
    "hora": "09:00",
    "__v": 0
  }
}

