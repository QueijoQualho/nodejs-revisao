import { body } from 'express-validator';

export const validTitle = body("title")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Invalid value for title!");

export const validContent = body("content")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Invalid value for content!");

export const validEmail = body(["email"])
    .if((value, { req }) => req.body.email !== undefined)
    .isEmail().normalizeEmail()
    .withMessage("Please provide a valid e-mail address!")

export const validPassword = body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long.")

export const validName = body("name")
    .isLength({ min: 5 })
    .withMessage('Nome deve ter no mínimo 5 caracteres')
    
