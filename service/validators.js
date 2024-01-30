import { body } from 'express-validator';

export const validTitle = body("title")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Invalid value for title!");

export const validContent = body("content")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Invalid value for content!");