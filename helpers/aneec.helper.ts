import multer from "multer";
import path from "path";

// Configuración de Multer con parámetros personalizados
export const configureMulter = (uploadBasePath: string) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadBasePath);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Nombre del archivo: timestamp + extensión
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