import express from "express";
import {
  chengePasswordUser,
  deleteUser,
  getAllUsers,
  getUserID,
  patchUser,
} from "../controller/userController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserID);
router.patch("/:id", patchUser);
router.patch("/chengePassword/:id", chengePasswordUser)
router.delete("/:id", deleteUser);

export default router;
