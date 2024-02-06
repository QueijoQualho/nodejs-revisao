import { validationResult } from "express-validator";
import User from "../models/loginBD.js";

async function register(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validação deu errado");
      error.status = 422;
      throw error;
    }

    const { name, email, password } = req.body;

    const newUser = await User.create({
      name,
      email,
      password,
    });

    res.json(newUser);
  } catch (error) {
    console.error("Erro no cadastro", error);
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const erros = validationResult(req);

    if (!erros.isEmpty()) {
      const error = new Error("Validação deu errado");
      error.status = 422;
      throw error;
    }

    const { email, password } = req.body;

    const emailUser = await User.findOne({email})

    if(!emailUser){
      const error = new Error('Email inválidas');
      error.status = 401;
      throw error;
    } 

    const passwordUser = await User.findOne({password}) 

    if(!passwordUser){
      const error = new Error('Senha inválidas');
      error.status = 401;
      throw error;
    }

    if(emailUser && passwordUser){
        res.status(200).json({ message: 'Login bem-sucedido', user: emailUser});
    } else {
        const error = new Error('Credenciais inválidas');
        error.status = 401;
        throw error;
    }

  } catch (error) {
    console.error("Erro no login", error);
    next(error);
  }

}

export { register, login };