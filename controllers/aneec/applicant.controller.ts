// import { ct_niveles_educativos } from './../../src/models/modelProdep/ct_niveles_educativos';
import { Request, Response, NextFunction } from "express";
import { getModels } from "../../models/modelsAnnec"; // Importa los modelos
import path from 'path';
import fs from 'fs';
import { Op } from 'sequelize';
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

//metodo de control
export const accesoController = async (req: Request, res: Response,) => {

  res.status(200).json({message:"ACCESO CORRECTO"});

}


//crear nuevo aspirante 
export const createApplicantAneec = async (req: Request, res: Response) => {
  const {curp,nombre,apellido_paterno,apellido_materno,correo,fecha_nacimiento,instituto,
    licenciatura,direccion,codigo_postal,ct_municipio_id,localidad,ct_usuarios_in
  } = req.body;

  // Obtener los archivos subidos
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  try {
    modelsValidator(req, res);

    // Verificar si la CURP ya existe en la base de datos
    const existingApplicant = await promette.dt_aspirante_aneec.findOne({ where: { curp } });
    if (existingApplicant) {
      // Eliminar archivos subidos si la CURP ya existe
      const fileFields = [
        'ruta_ine','ruta_comprobante_estudio','ruta_comprobante_domicilio',
        'ruta_carta_compromiso','ruta_carta_compromiso_tutor','ruta_aviso_privacidad_aspirante',
        'ruta_provacidad_usuario'
      ];
      for (const field of fileFields) {
        if (files[field] && files[field][0]) {
          if (fs.existsSync(files[field][0].path)) { // Verificar si el archivo existe
            fs.unlinkSync(files[field][0].path); // Eliminar archivo subido
          }
        }
      }
      return res.status(400).json({ message: "La CURP ya está registrada" });
    }

    const fileFields = [
      'ruta_ine','ruta_comprobante_estudio','ruta_comprobante_domicilio',
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

    res.status(201).json({success: true, message: "Registro creado exitosamente", data: newApplicant });
  } catch (error) {
   

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
        if (fs.existsSync(files[field][0].path)) { // Verificar si el archivo existe
          fs.unlinkSync(files[field][0].path); // Eliminar archivo subido
        }
      }
    }

    res.status(500).json({success: false, message: "Error al crear el registro" });
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
    res.status(200).json({ success: true, applicants: applicants });
  } catch (error) {

    res.status(500).json({ success: false, message: "Error al obtener los aspirantes" });
  }
};
   
//Obtener municipios de la base de datos
export const getAllMunicipalities = async (req: Request, res: Response) => {
  try{
    //verificar si los moelos estan disponibles 
    modelsValidator(req,res)
    
    const municipalities = await promette.ct_municipio.findAll();

    //devolvemos los registros (municipios)
   res.status(200).json({success: true, municipios: municipalities })

  }catch(error){
    res.status(500).json({ success: false, message: "Error al obtener los municipios" });
  }
}

//actualizar aspirante(evaluador) annec 
export const updateApplicantAneec = async (req: Request, res: Response) => {
  const {
    id_aspirante, 
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

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  try {
    modelsValidator(req, res);

    // Buscar el aspirante existente
    const existingApplicant = await promette.dt_aspirante_aneec.findByPk(id_aspirante);
    if (!existingApplicant) {
      // Eliminar archivos subidos si el aspirante no existe
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
          if (fs.existsSync(files[field][0].path)) { // Verificar si el archivo existe
            fs.unlinkSync(files[field][0].path); // Eliminar archivo subido
          }
        }
      }
      return res.status(404).json({ message: "Aspirante no encontrado" });
    }

    // Verificar si la CURP ya existe en la base de datos (excepto para el mismo aspirante)
    const existingApplicantWithCurp = await promette.dt_aspirante_aneec.findOne({ 
      where: { curp, id_aspirante: { [Op.ne]: id_aspirante } } // Excluir el mismo aspirante
    });
    if (existingApplicantWithCurp) {
      // Eliminar archivos subidos si la CURP ya existe
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
          if (fs.existsSync(files[field][0].path)) { // Verificar si el archivo existe
            fs.unlinkSync(files[field][0].path); // Eliminar archivo subido
          }
        }
      }
      return res.status(400).json({success: false, message: "La CURP ya está registrada en otro aspirante" });
    }

    // Lista de campos de archivos
    const fileFields = [
      'ruta_ine',
      'ruta_comprobante_estudio',
      'ruta_comprobante_domicilio',
      'ruta_carta_compromiso',
      'ruta_carta_compromiso_tutor',
      'ruta_aviso_privacidad_aspirante',
      'ruta_provacidad_usuario'
    ];

    // Eliminar archivos antiguos si se suben nuevos
    for (const field of fileFields) {
      if (files[field] && files[field][0]) {
        if (existingApplicant[field]) {
          const oldFilePath = path.join(process.env.UPLOAD_BASE_PATH || '', 'documentsAneec', existingApplicant[field]);
          if (fs.existsSync(oldFilePath)) { // Verificar si el archivo existe
            fs.unlinkSync(oldFilePath); // Eliminar archivo antiguo
          }
        }
      }
    }

    // Actualizar los datos del aspirante
    const updatedApplicant = await existingApplicant.update({
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
      ruta_ine: files['ruta_ine'] ? files['ruta_ine'][0].filename : existingApplicant.ruta_ine,
      ruta_comprobante_estudio: files['ruta_comprobante_estudio'] ? files['ruta_comprobante_estudio'][0].filename : existingApplicant.ruta_comprobante_estudio,
      ruta_comprobante_domicilio: files['ruta_comprobante_domicilio'] ? files['ruta_comprobante_domicilio'][0].filename : existingApplicant.ruta_comprobante_domicilio,
      ruta_carta_compromiso: files['ruta_carta_compromiso'] ? files['ruta_carta_compromiso'][0].filename : existingApplicant.ruta_carta_compromiso,
      ruta_carta_compromiso_tutor: files['ruta_carta_compromiso_tutor'] ? files['ruta_carta_compromiso_tutor'][0].filename : existingApplicant.ruta_carta_compromiso_tutor,
      ruta_aviso_privacidad_aspirante: files['ruta_aviso_privacidad_aspirante'] ? files['ruta_aviso_privacidad_aspirante'][0].filename : existingApplicant.ruta_aviso_privacidad_aspirante,
      ruta_provacidad_usuario: files['ruta_provacidad_usuario'] ? files['ruta_provacidad_usuario'][0].filename : existingApplicant.ruta_provacidad_usuario,
      ct_usuarios_in
    });

    res.status(200).json({success: true,  message: "Aspirante actualizado exitosamente", data: updatedApplicant });
  } catch (error) {
    console.error("Error al actualizar el aspirante:", error);

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
        if (fs.existsSync(files[field][0].path)) { // Verificar si el archivo existe
          fs.unlinkSync(files[field][0].path); // Eliminar archivo subido
        }
      }
    }

    res.status(500).json({ success: false, message: "Error al actualizar el aspirante" });
  }
};

//Metodo para obtener un documento en esfecifio de un aspirante 
export const getSpecificDocuments = async (req: Request, res: Response): Promise<void> => {
  try {
    const {fileRoute } = req.params;

    modelsValidator(req, res);

    const rutaInfografia = fileRoute;
    const uploadBasePath = `${process.env.UPLOAD_BASE_PATH}/documentsAneec/` || '';

    const rutaCompleta = path.join(uploadBasePath, rutaInfografia);

    // Verificar si el archivo existe
    if (!fs.existsSync(rutaCompleta)) {
      res.status(404).json({ success: false, message: "Archivo no encontrado" });
      return;
    }

    // Enviar el archivo como respuesta
    res.sendFile(rutaCompleta);
  } catch (error) {
    console.error("Error al obtener el documento:", error);
    res.status(400).json({
      success: false,
      message: "Error al obtener el documento",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};