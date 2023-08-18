import { Router } from "express";
import { mooviesController } from "../controllers/moovies.controller.js";

const initMoovieRoutes = (app, sm, jwt) => {
  const router = Router();
  router.get("/get", sm, mooviesController.get);
  router.get("/get-all", jwt, sm, mooviesController.getAll);
  router.post("/create", jwt, sm, mooviesController.create);
  router.patch("/update", jwt, sm, mooviesController.update);
  router.delete("/delete/:MoovieId", jwt, sm, mooviesController.deleteT);

  app.use("/moovie", router);
};

export default initMoovieRoutes;
