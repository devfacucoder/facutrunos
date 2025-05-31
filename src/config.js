import dotenv from "dotenv";
dotenv.config();
const config = {
  dbUrlConnect: process.env.DB_URL,
  secret: process.env.SECRETO,
  nombreAd: process.env.NOMBRE_AD,
  apeAd: process.env.APELLIDO_AD,
  passAdmin: process.env.PASS_AD,
};

export default config;
