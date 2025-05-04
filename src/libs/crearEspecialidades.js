import Especialidad from "../models/especialidad.model.js"

const crearEspecialidades = async () =>{
    try {
        const listEspecialidades = [
            "odontologo","dentista","oculista","ginecologo"
        ]
       for(const esp of listEspecialidades){
        const especia = await Especialidad.findOne({nombre:esp})
        if(!especia){
            await Especialidad.create({nombre:esp});
            console.log(esp+ " se ha creado")
        }else{
            console.log(esp+ " se ya estaba creada")

        }

       }

    } catch (error) {
        console.log(error)
    }

}

export default crearEspecialidades;