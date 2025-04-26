import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

// Configuración de Multer con parámetros personalizados
export const configureMulter = (uploadBasePath: string) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadBasePath);
    },
    filename: function (req, file, cb) {
      const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
      const filePath = path.join(uploadBasePath, uniqueName);

      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
          const newUniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
          cb(null, newUniqueName);
        } else {
          cb(null, uniqueName);
        }
      });
    }
  });

  return multer({ storage: storage });
};

// Función genérica para definir campos de Multer
export const defineMulterFields = (fields: { name: string; maxCount: number }[]) => fields;

export const applicantFields = () => [
  { name: 'ruta_ine', maxCount: 1 },
  { name: 'ruta_comprobante_estudio', maxCount: 1 },
  { name: 'ruta_comprobante_domicilio', maxCount: 1 },
  { name: 'ruta_carta_compromiso', maxCount: 1 },
  { name: 'ruta_carta_compromiso_tutor', maxCount: 1 },
  { name: 'ruta_aviso_privacidad_aspirante', maxCount: 1 },
  { name: 'ruta_provacidad_usuario', maxCount: 1 }
];
