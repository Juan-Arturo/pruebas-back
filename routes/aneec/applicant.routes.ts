import { Router } from "express";
import { configureMulter, applicantFields } from "../../helpers/aneec.helper";
import {
    accesoController,
    createApplicantAneec,
    getAllApplicantsAneec
} from "../../controllers/aneec/applicant.controller";
import { validateRequest } from "../../middlewares/validateRequest.md";
import { validateJwt } from "../../middlewares/validate.md";

const router = Router();

// Configuración de Multer
const uploadCreateApplicantAnec = configureMulter(`${process.env.UPLOAD_BASE_PATH}/documentsAneec`);


// Probar acceso al controlador
router.get("/pruebaConexion", accesoController);

// Crear nuevo aspirante con archivos
router.post("/createApplicantAnec", uploadCreateApplicantAnec.fields(applicantFields()), createApplicantAneec);

// Listar todos los aspirantes
router.get("/getApplicantsAneec", getAllApplicantsAneec);

export default router;