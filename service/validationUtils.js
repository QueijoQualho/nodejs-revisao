import { validationResult } from "express-validator";

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Erro de validação do formulário");
    error.status = 422;

    const errorMessages = errors.array().map((error) => {
      return {
        param: error.value,
        msg: `O campo '${error.path}' falhou na validação: ${error.msg}`,
      };
    });

    error.errors = errorMessages;

    return next(error);
  }

  return;
};

export default handleValidationErrors;