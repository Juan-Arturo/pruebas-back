import multer from "multer";

// Función de filtro de archivos para validar el tipo de archivo
const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const { tipoDocumento } = req.body;

  if (!tipoDocumento) {
    return cb(new Error("El tipoDocumento es requerido."));
  }

  const mimeType = file.mimetype;
  const expectedType = tipoDocumento.toLowerCase();

  const mimeMap: Record<string, string> = {
    pdf: "application/pdf",
    image: "image/jpeg, image/png, image/gif, image/bmp, image/webp",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  };

  const validMime = mimeMap[expectedType];

  if (!validMime) {
    return cb(new Error(`Tipo de documento no válido: ${tipoDocumento}.`));
  }

  if (expectedType === "image") {
    const validImageTypes = validMime.split(",").map((type) => type.trim());
    if (!validImageTypes.includes(mimeType)) {
      return cb(
        new Error(`El archivo debe ser de tipo 'image', pero es '${mimeType}'.`)
      );
    }
  } else {
    if (mimeType !== validMime) {
      return cb(
        new Error(
          `El archivo debe ser de tipo '${tipoDocumento}', pero es '${mimeType}'.`
        )
      );
    }
  }

  cb(null, true);
};

export default fileFilter;
