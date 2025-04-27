import { Router } from "express";
import { configureMulterAneec, applicantFields } from "../../helpers/aneec.helper";
import {
    accesoController,
    createApplicantAneec,
    getAllApplicantsAneec,
    updateApplicantAneec,
    getAllMunicipalities
} from "../../controllers/aneec/applicant.controller";
import { validateRequest } from "../../middlewares/validateRequest.md";
import { validateJwt } from "../../middlewares/validate.md";

const router = Router();

// Configuración de Multer
const uploadCreateUpdateApplicantAnec = configureMulterAneec(`${process.env.UPLOAD_BASE_PATH}/documentsAneec`);


// Probar acceso al controlador
router.get("/pruebaConexion", accesoController);

// Crear nuevo aspirante con archivos
router.post("/createApplicantAnec", uploadCreateUpdateApplicantAnec.fields(applicantFields()), createApplicantAneec);

// Listar todos los aspirantes
router.get("/getApplicantsAneec", getAllApplicantsAneec);

// Actualizar aspirante con archivos
router.put("/updateApplicantAnec", uploadCreateUpdateApplicantAnec.fields(applicantFields()), updateApplicantAneec);

//Obtener los municipios
router.get("/getMunicipalities", getAllMunicipalities)

export default router;