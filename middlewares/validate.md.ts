// import axios from "axios";
// import { Response, NextFunction } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { env } from "process";

// // Definición del middleware `validateJwt` mejorado
// const validateJwt = async (
//   req: any,
//   res: Response,
//   next: NextFunction
// ): Promise<Response | void> => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");

//   if (!token) {
//     return res.status(401).json({
//       msg: "No hay token en la petición",
//     });
//   }

//   try {
//     // Realizando una petición GET con Axios
//     axios
//       .get(`${process.env.PROMEETE_API}/auth/isAuthorization/${token}`)
//       .then((response) => {
//         if (response.status == 200) {
//           next();
//         }
//       });
//   } catch (error) {
//     if (error instanceof jwt.TokenExpiredError) {
//       return res.status(401).json({
//         msg: "Token expirado",
//       });
//     }
//     return res.status(401).json({
//       msg: "Token no válido",
//     });
//   }
// };

// export { validateJwt };

import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Definición del middleware `validateJwt` mejorado
const validateJwt = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    // Verifica el token y extrae el id del payload
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret"
    ) as JwtPayload;

    // Comprobamos si el token está expirado
    if (decoded.exp && decoded.exp < Date.now() / 1000) {
      return res.status(401).json({
        msg: "Token expirado",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        msg: "Token expirado",
      });
    }
    return res.status(401).json({
      msg: "Token no válido",
    });
  }
};

export { validateJwt };
