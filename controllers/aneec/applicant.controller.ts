// import { ct_niveles_educativos } from './../../src/models/modelProdep/ct_niveles_educativos';
import { Request, Response, NextFunction } from "express";
import { getModels } from "../../models/modelsAnnec"; // Importa los modelos
import dotenv from "dotenv";
import axios from 'axios';
import FormData from 'form-data';
//interfaces
const PDFDocument = require('pdfkit');
import swaggerJSDoc from "swagger-jsdoc";
import { json } from "sequelize";

import { Writable } from 'stream';

//obtencion de modelos

let promette: any;
getModels(process.env.DBNAMES || "")
  .then((models) => {
    promette = models;
  })
  .catch((error) => {
    console.error("Error al inicializar los modelos:", error);
  });



//verificar si los modelos se pueden usar correctamente
const modelsValidator = async (req: Request, res: Response,) => {
  if (!promette) {
    res.status(500).json({ message: "Error de conexión con la base de datos" });
    return;
  }

}
//METODOS DEL CONTROLADOR//

export const accesoController = async (req: Request, res: Response,) => {

  res.status(200).json({message:"ACCESO CORRECTO"});

}



