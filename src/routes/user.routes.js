import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const initUserRoutes = (app, sm, jwt) => {
  const router = Router();
  router.get("/get-all", jwt, sm, UserController.getAll);
  router.post("/login", sm, UserController.login);
  router.post("/sign-up", sm, UserController.signUp);
  router.patch("/update-pseudo", jwt, sm, UserController.updatePseudo);
  router.delete("/delete", jwt, sm, UserController.deleteOne);
  router.get("/user-movies", jwt, sm, UserController.getUserWithMovies);
  router.patch("/update-favmovies", jwt, sm, UserController.updateFavMovies);

  app.use("/user", router);
};

export default initUserRoutes;
