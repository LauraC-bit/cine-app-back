import initMoovieRoutes from "./moovie.routes.js";
import initUserRoutes from "./user.routes.js";
import { sanitizeMiddleware } from "../middlewares/sanitize.middleware.js";
import { jwtMiddleware } from "../middlewares/jwt.middleware.js";

const initRoutes = (app) => {
  initMoovieRoutes(app, sanitizeMiddleware, jwtMiddleware);
  initUserRoutes(app, sanitizeMiddleware, jwtMiddleware);
};

export default initRoutes;
