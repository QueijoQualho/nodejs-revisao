import { validationResult } from 'express-validator'
import User from '../models/loginBD.js';

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
            password
        });

        res.json(newUser);
    } catch (error) {
        console.error('Erro no cadastro', error);
        next(error);
    }
}


function login(req, res, next) {
    const erros = validationResult(req)

    const { email, senha } = req.body;

    if (!erros.isEmpty()) {
        const error = new Error("Validação deu errado")
        error.status = 422
        throw error
    }

    res.send({
        email, senha
    })

}

export { register, login }