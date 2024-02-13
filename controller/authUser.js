import { authentication, random } from "../helpers/cryptography.js";
import { createUser, getUsersbyEmail } from "../models/userBD.js";
import handleValidationErrors from "../service/validationUtils.js";

async function register(req, res, next) {
  try {
    const validationError = handleValidationErrors(req, res, next);

    if (validationError) {
      throw validationError;
    }

    const { name, email, password } = req.body;

    const salt = random();
    const user = await createUser({
      name,
      email,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error("Erro no cadastro", error);
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const validationError = handleValidationErrors(req, res, next);

    if (validationError) {
      throw validationError;
    }

    const { email, password } = req.body;

    const user = await getUsersbyEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      const error = new Error("Credenciais inválidas");
      error.status = 401;
      throw error;
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password != expectedHash) {
      const error = new Error("Credenciais inválidas");
      error.status = 403;
      throw error;
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie("AUTH-API", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error("Erro no login", error);
    next(error);
  }
}

export { register, login };
