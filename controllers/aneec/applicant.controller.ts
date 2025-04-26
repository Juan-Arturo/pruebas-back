// import { ct_niveles_educativos } from './../../src/models/modelProdep/ct_niveles_educativos';
import { Request, Response, NextFunction } from "express";
import { getModels } from "../../models/modelsAnnec"; // Importa los modelos
import path from 'path';
import fs from 'fs';
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
    apellido_paterno,
    apellido_materno,
    correo,
    fecha_nacimiento,
    instituto,
    licenciatura,
    direccion,
    codigo_postal,
    ct_municipio_id,
    localidad,
    ct_usuarios_in
  } = req.body;

  // Obtener los archivos subidos
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  try {
    modelsValidator(req, res);

    const fileFields = [
      'ruta_ine',
      'ruta_comprobante_estudio',
      'ruta_comprobante_domicilio',
      'ruta_carta_compromiso',
      'ruta_carta_compromiso_tutor',
      'ruta_aviso_privacidad_aspirante',
      'ruta_provacidad_usuario'
    ];

    // Verificar si todos los archivos fueron subidos
    for (const field of fileFields) {
      if (!files[field] || files[field].length === 0) {
        // Eliminar archivos subidos si estan inclompletos
        for (const field of fileFields) {
          if (files[field] && files[field][0]) {
            fs.unlinkSync(files[field][0].path); // Eliminar archivo subido
          }
        }
        return res.status(400).json({ message: `El archivo ${field} es requerido.` });
      }
    }

    // Si todos los archivos se guardaron correctamente, proceder con el registro en la base de datos
    const newApplicant = await promette.dt_aspirante_aneec.create({
      curp,
      nombre,
      apellido_paterno,
      apellido_materno,
      correo,
      fecha_nacimiento,
      instituto,
      licenciatura,
      direccion,
      codigo_postal,
      ct_municipio_id,
      localidad,
      ruta_ine: files['ruta_ine'][0].filename,
      ruta_comprobante_estudio: files['ruta_comprobante_estudio'][0].filename,
      ruta_comprobante_domicilio: files['ruta_comprobante_domicilio'][0].filename,
      ruta_carta_compromiso: files['ruta_carta_compromiso'][0].filename,
      ruta_carta_compromiso_tutor: files['ruta_carta_compromiso_tutor'][0].filename,
      ruta_aviso_privacidad_aspirante: files['ruta_aviso_privacidad_aspirante'][0].filename,
      ruta_provacidad_usuario: files['ruta_provacidad_usuario'][0].filename,
      ct_usuarios_in
    });

    res.status(201).json({ message: "Registro creado exitosamente", data: newApplicant });
  } catch (error) {
    console.error("Error al crear el registro:", error);

    // Eliminar archivos subidos en caso de error
    const fileFields = [
      'ruta_ine',
      'ruta_comprobante_estudio',
      'ruta_comprobante_domicilio',
      'ruta_carta_compromiso',
      'ruta_carta_compromiso_tutor',
      'ruta_aviso_privacidad_aspirante',
      'ruta_provacidad_usuario'
    ];
    for (const field of fileFields) {
      if (files[field] && files[field][0]) {
        fs.unlinkSync(files[field][0].path); // Eliminar archivo subido
      }
    }

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
   



