import User from "../models/userBD.js";
import handleValidationErrors from "../service/validationUtils.js";

async function register(req, res, next) {
  try {
    handleValidationErrors(req, res, next);

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
    await handleValidationErrors(req, res, next);

    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      const error = new Error("Credenciais inválidas");
      error.status = 401;
      throw error;
    }

    return res.status(200).json({ message: "Login bem-sucedido", user: user });
  } catch (error) {
    console.error("Erro no login", error);
    next(error);
  }
}

export { register, login };