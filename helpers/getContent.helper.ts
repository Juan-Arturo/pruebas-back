import path from "path";

export const getContentType = (ruta: string) => {
    const ext = path.extname(ruta).toLowerCase();
    if ([".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext)) {
        return "image/jpeg"; // Asume que es una imagen
    }
    if (ext === ".pdf") {
        return "application/pdf"; // Para PDFs
    }
    return "application/octet-stream"; // Tipo genérico si no es reconocible
};
