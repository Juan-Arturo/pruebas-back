import { Router } from "express";
import {
    accesoController,
    createApplicantAneec,
    getAllApplicantsAneec

} from "../../controllers/aneec/applicant.controller";
import { validateRequest } from "../../middlewares/validateRequest.md";

import { validateJwt } from "../../middlewares/validate.md";

const router = Router();

router.get("/pruebaConexion",accesoController)

//crear nuevo aspirante
router.post("/crateApplicantAnec", createApplicantAneec)

//listar todos los aspirantes
router.get("/getApplicantsAneec", getAllApplicantsAneec)


export default router;