import express from "express";
import {
  deleteUser,
  getAllUsers,
  patchUser,
} from "../controller/UserController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.delete("/:id", deleteUser);
router.patch("/:id", patchUser);

export default router;