import express from "express";
import router from "./router/routerMain.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import dotenv from "dotenv";
import dbConnection from "./bd.js";

dotenv.config();
dbConnection;

/* FAZER TESTES DECENTES PARA API DE USER E POSTS, LEMBRAR DE TESTAR OS COOKIE */
/* TALVEZ TROCAR PATCH USER POR UPDATE */

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(compression());
app.use(cookieParser());

app.use("/", router);

app.use((error, req, res, next) => {
  if (error.length > 0) {
    const validationErrors = error.map((err) => ({
      field: err.path,
      msg: err.msg,
    }));
    return res
      .status(error.status || 422)
      .json({ errors: validationErrors, error: true });
  }
  return res
    .status(error.status || 500)
    .json({ error: "Internal Server Error", error: true });
});

/* Conexão banco de dados + servidor */

app.listen(port, () => {
  console.log(`conectado na porta ${port}`);
});

export default app;
