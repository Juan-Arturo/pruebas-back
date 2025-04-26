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
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Cargar variables de entorno
dotenv.config();

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

// Configuración de multer para manejar archivos PDF
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOAD_BASE_PATH || './');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'diagnostico-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Solo se permiten archivos PDF'));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// Interface para los datos del estudiante
interface StudentData {
  nombre: string;
  curp: string;
  necesidadAtender: string;
  especificacion?: string;
  rehabilitacion: 'S' | 'N';
  municipio: number;
  dt_aspirante_id?: number;
}

export const registrarDiagnostico = async (req: Request, res: Response) => {
  try {
    if (!promette) {
      return res.status(500).json({ message: "Error de conexión con la base de datos" });
    }

    const { 
      nombreCompleto, 
      curp, 
      tipo_necesidad, 
      rehabilitacion_fisica, 
      ct_municipio_id, 
      dt_aspirante_id,
      ruta_diagnostico
    } = req.body;

    // Validar campos obligatorios
    if (!nombreCompleto || !curp || !tipo_necesidad || !rehabilitacion_fisica || !ct_municipio_id || !dt_aspirante_id) {
      return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    // Validar que ct_municipio_id exista en ct_municipio
    const municipio = await promette.ct_municipio.findByPk(ct_municipio_id);
    if (!municipio) {
      return res.status(400).json({ message: "El municipio no existe" });
    }

    // Obtener solo el nombre del archivo (sin la ruta completa)
    let nombreArchivo = '';
    if (req.file) {
      nombreArchivo = req.file.filename; // Usamos filename generado por multer (ej: "diagnostico-123456789.pdf")
    } else if (ruta_diagnostico) {
      nombreArchivo = path.basename(ruta_diagnostico); // Extrae el nombre del archivo si se envía manualmente
    }

    // Crear diagnóstico (guardando solo el nombre del archivo)
    const diagnostico = await promette.dt_diagnostico_aneec.create({
      nombreCompleto,
      curp,
      tipo_necesidad,
      rehabilitacion_fisica,
      ct_municipio_id,
      dt_aspirante_id,
      ruta_diagnostico: nombreArchivo, // Solo el nombre del archivo
      ct_usuarios_in: 1,
      fecha_in: new Date()
    });

    return res.status(201).json({
      message: "Diagnóstico registrado exitosamente",
      diagnostico
    });

  } catch (error) {
    console.error("Error detallado:", error);
    return res.status(500).json({ 
      message: "Error al procesar la solicitud",
      error: error instanceof Error ? error.message : "Error desconocido"
    });
  }
};

// Middleware para manejar la subida de archivos
export const uploadDiagnostico = upload.single('diagnostico');