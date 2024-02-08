import express from "express";
import { register, login } from "../controller/authUser.js";
import {
  validEmail,
  validIfEmailExist,
  validName,
  validPassword,
} from "../service/validators.js";

const router = express.Router();

router.post(
  "/singup",
  [validName, validEmail, validPassword, validIfEmailExist],
  register
);

router.post("/login", [validEmail, validPassword], login);

export default router;
