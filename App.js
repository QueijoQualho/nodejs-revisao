import express from "express";
import router from "./router/routerMain.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import dotenv from 'dotenv'
import dbConnection from "./bd.js";

dotenv.config()
dbConnection

/* QUANDO MEXER COM BD MUDAR AS FUNÇÔES PARA ASYSC SE NÃO DA ERRO CRL  */

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(compression());
app.use(cookieParser());

app.use("/", router);

app.use((error, req, res, next) => {
  if (error.errors && error.errors.length > 0) {
    const validationErrors = error.errors.map((err) => ({
      field: err.param,
      message: err.msg,
    }));
    return res.status(error.status || 422).json({ errors: validationErrors });
  }
  return res
    .status(error.status || 500)
    .json({ error: "Internal Server Error" });
});

/* Conexão banco de dados + servidor */

app.listen(port, ()=>{
  console.log(`conectado na porta ${port}`);
})
