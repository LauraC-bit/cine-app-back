import { Router } from "express";
import { mooviesController } from "../controllers/moovies.controller.js";

const initMoovieRoutes = (app, sm, jwt) => {
  const router = Router();
  router.get("/get", sm, mooviesController.get);
  router.get("/get-all", sm, mooviesController.getAll);
  //router.delete("/delete/:MoovieId", jwt, sm, mooviesController.deleteOne); supprimer film des fav d'un utilisateur

  app.use("/moovie", router);
};

export default initMoovieRoutes;
