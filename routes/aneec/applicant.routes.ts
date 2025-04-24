import { Router } from "express";
import {
    accesoController

} from "../../controllers/aneec/applicant.controller";
import { validateRequest } from "../../middlewares/validateRequest.md";

import { validateJwt } from "../../middlewares/validate.md";

const router = Router();

router.get("/pruebaConexion",accesoController)

export default router;