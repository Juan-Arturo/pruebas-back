import { body, param, ValidationChain } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateIdDocument: ValidationChain[] = [
  param("id_documento")
    .isInt()
    .withMessage("El id es invalido")
    .notEmpty()
    .withMessage("El id del documento es obligatorio"),
];

export const validateNewDocument: ValidationChain[] = [
  body("nombre_documento")
    .isString()
    .withMessage("El nombre del documento es invalido")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("El nombre del documento es obligatorio"),

  body("estado_publica")
    .isBoolean()
    .withMessage("El estado de publicación es invalido")
    .notEmpty()
    .withMessage("El estado de publicación es obligatorio"),

  body("vigencia")
    .optional()
    .isInt()
    .withMessage("La vigencia debe ser un número entero"),

  body("unidad_periodo")
    .optional()
    .isIn(['dias', 'meses', 'años', 'sin vigencia'])
    .withMessage("La unidad de periodo debe ser dias, meses o años"),
];

export const validateUpdateDocument: ValidationChain[] = [
  body("id_documento")
    .isInt()
    .withMessage("El id es invalido")
    .notEmpty()
    .withMessage("El id del documento es obligatorio"),
  ...validateNewDocument
];

export const validateUploadDocument = [
  body("id_documento")
    .trim()
    .isInt()
    .withMessage("El id del documento es invalido")
    .notEmpty()
    .withMessage("El id del documento es obligatorio"),

  // Middleware personalizado para manejar las variantes del campo
  (req: Request, res: Response, next: NextFunction) => {
    // Normalizar el campo id_informacion_rupeet
    req.body.id_informacion_rupeet = (
      req.body.id_informacion_rupeet ||
      req.body.id_informacon_rupeet || // typo común
      req.body.id_usuario
    )?.toString().trim();

    // Validar que existe el campo normalizado
    if (!req.body.id_informacion_rupeet) {
      return res.status(400).json({
        errors: [{
          msg: "El id de información es obligatorio",
          received: req.body
        }]
      });
    }

    next();
  },

  // Validación del campo normalizado
  body("id_informacion_rupeet")
    .isInt()
    .withMessage("El id de información debe ser un número")
];
