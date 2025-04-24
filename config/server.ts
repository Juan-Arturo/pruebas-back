import express, { Application } from "express"; // Importando el módulo Express y el tipo Application para la verificación de tipos
import { helmetConfig } from "../middlewares/helmet.md"; // Importando la configuración personalizada de Helmet para los encabezados HTTP de seguridad
import { corsConfig } from "../middlewares/cors.md"; // Importando la configuración personalizada de CORS para gestionar las solicitudes de diferentes orígenes
import { rateLimitConfig } from "./rateLimit.config"; // Importando la configuración de limitación de tasa para prevenir abusos
import { hppConfig } from "../middlewares/hpp.md"; // Importando la configuración para prevenir la contaminación de parámetros HTTP
import { morganConfig } from "../middlewares/morgan.md"; // Importando la configuración de Morgan para registrar las solicitudes HTTP
import { csrfConfig } from "../middlewares/csrf.md"; // Importando la configuración de protección CSRF
import aneecApplicantRoutes from "../routes/aneec/applicant.routes"; // Importando las rutas de aplicantes
import aneecEvaluatorRoutes from "../routes/aneec/evaluator.route";


import { swaggerServe, swaggerSetup } from "./swagger.config"; // Importando la configuración de Swagger para servir la documentación de la API
import { connectAndSyncDatabases } from "../conexions/conexions";
import { securityHeaders } from "./headers.config";
import path from "path";

class Server {
  private app: Application; // Instancia de la aplicación Express
  private port: string; // Puerto del servidor, predeterminado a 8000 si no se proporciona en las variables de entorno

  constructor() {
    // Inicializar la aplicación Express
    this.app = express();
    this.port = process.env.PORT || "7000"; // Establecer el puerto desde las variables de entorno o usar el predeterminado

    // Llamar a los métodos para inicializar la conexión a la base de datos, los middlewares, las rutas y la documentación de Swagger
    this.dbConnection();
    this.middlewares();
    this.routes();
    this.swagger();
  }

  // Método para establecer las conexiones a las bases de datos (Rupet y Promette)
  private async dbConnection(): Promise<void> {
    try {
      // Esperar a que las conexiones a la base de datos se establezcan correctamente
      await connectAndSyncDatabases(); // Espera a que se resuelvan las conexiones

      console.log(
        "✅ Conexiones a las bases de datos establecidas correctamente."
      );
    } catch (error: any) {
      console.error(
        "❌ Error en la conexión a las bases de datos:",
        error.message || ""
      );
      process.exit(1); // Terminar proceso si falla la conexión a la base de datos
    }
  }

  // Método para configurar todos los middlewares
  private middlewares() {
    // Aplicar el middleware de Helmet para los encabezados de seguridad
    this.app.use(helmetConfig);

    // Aplicar el middleware CORS para gestionar solicitudes de diferentes orígenes
    this.app.use(corsConfig);

    // Aplicar limitación de tasa para evitar ataques de fuerza bruta
    this.app.use(rateLimitConfig);

    // Aplicar middleware para prevenir contaminación de parámetros HTTP (HPP)
    this.app.use(hppConfig);

    this.app.use(securityHeaders);
    // Aplicar el middleware de Morgan para registrar las solicitudes HTTP si el entorno es 'desarrollo'
    if (process.env.NODE_ENV === "development") {
      this.app.use(morganConfig);
    }

    // Middleware para analizar los cuerpos de las solicitudes en formato JSON
    this.app.use(express.json());

    // Servir archivos estáticos desde el directorio 'public'
    this.app.use(express.static("public"));
    //Servir carptea de files
    this.app.use("/files", express.static(path.join(__dirname, "files")));

    // Aplicar protección CSRF
    // this.app.use(csrfConfig);
  }

  // Método para definir todas las rutas del servidor
  private routes() {

    // Rutas de autenticación y usuarios
    this.app.use(`${process.env.HOST}api/annecApplicant`, aneecApplicantRoutes); // Rutas de registro de aplicantes aneec
    this.app.use(`${process.env.HOST}api/annecEvaluator`, aneecEvaluatorRoutes); // Rutas para diagnosticos e informes
   
  }

  // Método para configurar la documentación de la API con Swagger
  private swagger() {
    // Servir la UI de Swagger en el endpoint /api-docs/api/auth
    this.app.use(`${process.env.HOST}api/api-docs`, swaggerServe, swaggerSetup);
  }

  // Método para iniciar el servidor y escuchar en el puerto especificado
  public listen() {
    // Iniciar el servidor Express en el puerto especificado
    this.app.listen(this.port, () => {
      console.log(`🚀 Servidor corriendo en puerto ${this.port}`); // Registrar el puerto en el que está escuchando el servidor
    });
  }
}

export default Server;
