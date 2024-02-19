import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserID,
  patchUser,
} from "../controller/UserController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserID);
router.patch("/:id", patchUser);
router.delete("/:id", deleteUser);

export default router;
