import cors from "cors"; // verifier l'origine d'une requête
import express from "express";

const initMiddlewares = (app) => {
  // CORS
  const corsOrigin = process.env.CORS_ORIGIN || "*"; //url de ton site

  const corsOptions = {
    // si https://goole.com/
    // origin: (origin, callback) => {
    //   // alors indexOf === 1
    //   if (whitelist.indexOf(origin) !== -1) {
    //     callback(null, true);
    //   } else {
    //     callback(new Error("Not allowed by CORS"));
    //   }
    // },
    origin: "*",
  };

  app.use(cors(corsOptions));

  // parse requests of content-type - application/json
  app.use(express.json({ limit: "50mb" }));
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));

  app.use(express.static("public"));
};

export default initMiddlewares;
