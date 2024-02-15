import { body } from "express-validator";
import { getUsersbyEmail } from "../models/userBD.js";

/* POST VALIDATORS */
export const validTitle = body("title")
  .trim()
  .isLength({ min: 5 })
  .withMessage("Invalid value for title!");

export const validContent = body("content")
  .trim()
  .isLength({ min: 5 })
  .withMessage("Invalid value for content!");

export const validImage = body

/* USER VALIDATORS */
export const validName = body("name")
  .if((value, { req }) => req.body.name !== undefined && req.body.name !== null)
  .isLength({ min: 5 })
  .withMessage("Name must be at least 5 characters long.");

export const validEmail = body("email")
  .if(
    (value, { req }) => req.body.email !== undefined && req.body.email !== null
  )
  .isEmail()
  .normalizeEmail()
  .withMessage("Please provide a valid e-mail address!");

export const validPassword = body("password")
  .isLength({ min: 5 })
  .withMessage("Password must be at least 5 characters long.");

export const validIfEmailExist = body("email").custom(
  async (value, { req }) => {
    const existUser = await getUsersbyEmail(value);
    if (existUser) {
      throw new Error("This email is already in use");
    }

    return true;
  }
);
