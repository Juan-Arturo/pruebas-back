import { getConexiones } from "../conexions/conexions";
import { initModels } from "./modelAneec/init-models";

export const getModels = async (bd: string) => {
  // Obtener la conexión para la base de datos 'nombre de la bd'
  const conexion = await getConexiones(bd);

  // Si la conexión es exitosa, inicializar los modelos
  if (conexion) {
    const models = initModels(conexion); // Pasar la conexión a initModels
    // console.log("Modelos inicializados:", models);
    return models;
  } else {
    console.log('No se pudo obtener la conexión para "rupeet".');
    return null;
  }
};
