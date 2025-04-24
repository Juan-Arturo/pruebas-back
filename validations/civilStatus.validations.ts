import { body, ValidationChain } from "express-validator";

export const validateIdCivilStatus: ValidationChain[] = [
  body("id_estado_civil")
    .isInt()
    .withMessage("El id es inválido")
    .notEmpty()
    .withMessage("El id del estado civil es obligatorio"),
];

export const validateNewCivilStatus: ValidationChain[] = [
  body("estado_civil")
    .isString()
    .withMessage("El estado civil es inválido")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("El nombre del estado civil es obligatorio"),
];

export const validateUpdateCivilStatus: ValidationChain[] = [
  ...validateIdCivilStatus,
  ...validateNewCivilStatus
];
