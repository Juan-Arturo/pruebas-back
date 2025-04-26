import { Router } from "express";
import {
    accesoController,
    registrarDiagnostico,
    uploadDiagnostico
} from "../../controllers/aneec/evaluator.controller";
import { validateRequest } from "../../middlewares/validateRequest.md";
import { validateJwt } from "../../middlewares/validate.md";

const router = Router();

router.get("/pruebaConexion", accesoController)

router.post("/registrarDiagnostico", uploadDiagnostico, registrarDiagnostico)

export default router;