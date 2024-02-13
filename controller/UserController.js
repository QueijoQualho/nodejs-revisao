import { deleteUserById, getUsers, getUsersbyEmail, getUsersbyID } from "../models/userBD.js";

async function getAllUsers(req, res, next) {
  try {
    const data = await getUsers();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

async function deleteUser(req, res, next) {
  try {
    const id = req.params.id;

    const data = await deleteUserById(id);

    if(!data){
        throw Error( 'Usuário não encontrado' );
    }

    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
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
    return res.sendStatus(400);
  }
}

export { getAllUsers, deleteUser, patchUser };
