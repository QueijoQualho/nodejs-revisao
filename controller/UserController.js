import { deleteUserById, getUsers, getUsersbyID } from "../models/userBD.js";

async function getAllUsers(req, res, next) {
  try {
    const data = await getUsers();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function getUserID(req, res, next) {
  try {
    const id = req.params.id;

    const userData = await getUsersbyID(id);

    if (!userData) {
      const error = new Error("Usuário não encontrado");
      error.status = 401;
      throw error;
    }

    return res.status(200).json(userData);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const id = req.params.id;
    const data = await deleteUserById(id);

    if (!data) {
      const error = new Error("Usuário não encontrado");
      error.status = 401;
      throw error;
    }

    return res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function patchUser(req, res, next) {
  try {
    const id = req.params.id;
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = await getUsersbyID(id);

    user.name = name;
    await user.save();

    return res.json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function chengePasswordUser(req, res, next) {
  try {
    const { password, newPassword } = req.body;
    const { id } = req.params

    if (!newPassword || !password) {
      return res.sendStatus(400);
    }

    const user = await getUsersbyID(id);

    if (user.password != password) {
      return res.status(401).json({ message: "Sua senha atual está errada!" })
    }

    if (user.password == newPassword) {
      return res.status(409).json({ message: 'A nova senha não pode ser igual a sua atual!' });
    }

    user.password = newPassword;
    await user.save()

    return res.json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export { getAllUsers, deleteUser, patchUser, getUserID, chengePasswordUser };
