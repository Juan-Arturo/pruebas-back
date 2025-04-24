import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

// Configuración de dotenv para variables de entorno
dotenv.config();

// Crear un cliente S3
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Configuración de Multer con S3
const storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_S3_BUCKET!, // El nombre del bucket S3

  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    // Generar un nombre único para el archivo
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName); // El key es el nombre de archivo único
  },
});
export default storage;
