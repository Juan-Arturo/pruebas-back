// Importación del módulo cors para manejar la política de CORS en la aplicación
import cors from "cors";

// Configuración de CORS para la aplicación
export const corsConfig = cors({
  // `origin`: Define los orígenes permitidos para las solicitudes CORS.
  // Si la variable de entorno `ALLOWED_ORIGINS` está definida, la utiliza; de lo contrario, permite solicitudes de cualquier origen (`*`).
  origin: process.env.ALLOWED_ORIGINS?.split(",") || "*",

  // `methods`: Define los métodos HTTP permitidos en las solicitudes CORS.
  // En este caso, se permiten solicitudes GET, POST y PUT .
  methods: "GET,POST,PUT",

  // `allowedHeaders`: Define los encabezados que se pueden incluir en las solicitudes CORS.
  // En este caso, se permiten los encabezados `Content-Type` y `Authorization`.
  allowedHeaders: "Content-Type,Authorization",
});
