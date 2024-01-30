import express from "express";
import router from "./router/routerMain.js";
import cors from 'cors'


/* QUANDO MEXER COM BD MUDAR AS FUNÇÔES PARA ASYSC SE NÃO DA ERRO CRL  */

const app = express()
const port = 3001

app.use(express.json())
app.use(cors())

app.use('/', router)

app.use((error, req, res, next) => {
    if (error.array) {
      const validationErrors = error.array().map(err => ({
        field: err.param,
        message: err.msg,
      }));
      return res.status(422).json({ errors: validationErrors });
    }
  
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  });
app.listen(port, () => {
    console.log("Server is running on port 3001")
})
