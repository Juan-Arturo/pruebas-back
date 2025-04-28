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
import { configureMulterAneec, defineMulterFields } from '../../helpers/aneec.helper';

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

// Configura Multer con la ruta base de subida
const uploadBasePath = process.env.UPLOAD_BASE_PATH || './filediagnostic';
const upload = configureMulterAneec(uploadBasePath);

// Define los campos de Multer si es necesario
const fields = defineMulterFields([
  { name: 'diagnostico', maxCount: 1 }
]);

// Middleware para manejar la subida de archivos
export const uploadDiagnostico = upload.single('diagnostico');

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

    if (!req.file) {
      return res.status(400).json({ message: "No se ha subido ningún archivo." });
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

    // Verificar si el error es una instancia de Error
    if (error instanceof Error) {
      if (error.message === 'La variable de entorno UPLOAD_BASE_PATH no está configurada.') {
        return res.status(500).json({ message: error.message });
      }
    }

    return res.status(500).json({ 
      message: "Error al procesar la solicitud",
      error: error instanceof Error ? error.message : "Error desconocido"
    });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = process.env.UPLOAD_BASE_PATH || './filediagnostic';
    
    // Crear el directorio si no existe y si UPLOAD_BASE_PATH no está definido
    if (!process.env.UPLOAD_BASE_PATH && !fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'diagnostico-' + uniqueSuffix + path.extname(file.originalname));
  }
});