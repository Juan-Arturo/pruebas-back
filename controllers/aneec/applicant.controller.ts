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


//crear nuevo aspirante 
export const createApplicantAneec = async (req: Request, res: Response) => {
  const {
    curp,
    nombre,
    aPaterno,
    aMaterno,
    correo,
    fechaNacimiento,
    instituto,
    licenciatura,
    direccion,
    cPostal,
    ct_municipio_id,
    localidad,
    ct_usuarios_in
  } = req.body;

  try {

    modelsValidator(req, res); 

 
    const newApplicant = await promette.dt_aspirante_aneec.create({
      curp,
      nombre,
      aPaterno,
      aMaterno,
      correo,
      fechaNacimiento,
      instituto,
      licenciatura,
      direccion,
      cPostal,
      ct_municipio_id,
      localidad,
      rutaINE: 'simulado_ine.pdf', 
      rutaComprobanteEstudio: 'simulado_comprobante_estudio.pdf', 
      rutaComprobanteDomicilio: 'simulado_comprobante_domicilio.pdf', 
      rutaCartaCompromiso: 'simulado_carta_compromiso.pdf',
      rutaCartaCompromisoTutor: 'simulado_carta_compromiso_tutor.pdf', 
      rutaAvisoPrivacidadAspirante: 'simulado_aviso_privacidad_aspirante.pdf', 
      rutaAvisoPrivacidadUsuario: 'simulado_aviso_privacidad_usuario.pdf',
      ct_usuarios_in
    });

    res.status(201).json({ message: "Registro creado exitosamente", data: newApplicant });
  } catch (error) {
    console.error("Error al crear el registro:", error);
    res.status(500).json({ message: "Error al crear el registro" });
  }
};


//obtener la lista de aspirantes
export const getAllApplicantsAneec = async (req: Request, res: Response) => {
  try {
    // Verifica si los modelos están disponibles
    modelsValidator(req, res); 

    // Obtiene todos los registros de la tabla dt_aspirante_aneec
    const applicants = await promette.dt_aspirante_aneec.findAll();

    // Devuelve los registros encontrados
    res.status(200).json({ message: "Aspirantes obtenidos exitosamente", applicants: applicants });
  } catch (error) {
    console.error("Error al obtener los aspirantes:", error);
    res.status(500).json({ message: "Error al obtener los aspirantes" });
  }
};

