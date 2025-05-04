import mongoose from "mongoose";
import config from "./config.js";
mongoose.connect(config.dbUrlConnect).then(()=>console.log("Base de datos Conectada"))
.catch((err)=>console.log("error en mongodb: "+ err))
export default mongoose


