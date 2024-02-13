import express from "express";
import router from "./router/routerMain.js";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import compression from 'compression';

/* QUANDO MEXER COM BD MUDAR AS FUNÇÔES PARA ASYSC SE NÃO DA ERRO CRL  */

const app = express();
const port = 3001;

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
  return res.status(error.status || 500).json({ error: "Internal Server Error" } );
});

/* Conexão banco de dados + servidor */

mongoose
  .connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("ta conectado");

    app.listen(port, () => {
      console.log("Server is running on port 3001");
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
