// Importación de los módulos necesarios para generar y servir la documentación Swagger
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Opciones de configuración para Swagger
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "API Documentation",  // Título de la documentación de la API
            version: "1.0.0",  // Versión de la API que se muestra en la documentación
            description: "Documentación de la API para el servidor",  // Breve descripción de lo que hace la API
        },
    },
    apis: ["./routes/**/*.ts"],  // Ruta donde Swagger buscará los archivos con anotaciones para la documentación
    // En este caso, la búsqueda se hace en los archivos .ts dentro de la carpeta "routes".
    // Los comentarios y anotaciones en estos archivos describirán las rutas y respuestas de la API.
};

// Generación de la especificación Swagger a partir de las opciones configuradas
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Exportación de los componentes necesarios para configurar la documentación Swagger
// `swaggerSetup` es el middleware que se utilizará para renderizar la interfaz de Swagger en el navegador
export const swaggerSetup = swaggerUi.setup(swaggerSpec);

// `swaggerServe` es el middleware que sirve la documentación de Swagger en una URL específica
export const swaggerServe = swaggerUi.serve;
