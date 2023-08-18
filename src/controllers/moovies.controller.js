import fs from "node:fs/promises";
import { mooviesDAO } from "../daos/moovies.dao.js";
import axios from "axios";
import Moovie from "../model/moovie.model.js";

const { readFile, writeFile } = fs;

//------------------------------------------------------------ DB

const get = () => {
  axios
    .get(
      "https://api.themoviedb.org/3/search/movie?api_key=d8836d766baef881268636dc25fce46c&language=fr-FR&query=home"
    )
    .then((movie) => Moovie.insertMany(movie.data.results))
    .then(() => console.log(Moovie));
};

//avoir des films classé par leur popularité, 19 films, pas de moyens de tout récupérer
//npm install node-fetch@2 --save

//const fetch = require('node-fetch');

// const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODgzNmQ3NjZiYWVmODgxMjY4NjM2ZGMyNWZjZTQ2YyIsInN1YiI6IjY0YzhjZTMwODlmNzQ5MDEwN2MwYzZiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OQ5gO7ZrwdkLnvdObhSw5K8IV0fEn0eZqpYV4-BstCc'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error('error:' + err));

// ----------------------------------------------------------- READ

const CURRENT_DIR = process.cwd();

const getAll = async (req, res) => {
  const { userId } = req.body;
  const result = await mooviesDAO.read(userId);
  if (!!result.error) return res.status(400).json({ message: result.error });
  return res.json({ Moovies: result });
};

// -------------------------------------------------------- CREATE

const create = async (req, res) => {
  const name = req.body.name;
  const url = req.body.url;
  const userId = req.body.userId;

  let result = await mooviesDAO.read(userId);
  result = result.data;
  if (!!result.error) return res.status(400).json({ message: result.error });

  const newMoovie = {
    name,
    url,
    userId,
  };

  console.log(result);

  result.results.push(newMoovie);

  const error = await mooviesDAO.write(result);
  if (!!error) return res.status(400).json({ message: error });
  res.status(201).json({
    message: "Moovie added successfully",
    moovieCreated: newMoovie,
  });
};

// --------------------------------------------------------------- DELETE
//try 404 not found
const deleteT = async (req, res) => {
  const { MoovieId, userId } = req.params;

  const id = Number(MoovieId);
  if (Number.isNaN(id) || typeof id !== "number")
    return res.status(400).json({ message: `id '${MoovieId}' not valid` });

  const result = await mooviesDAO.read(userId);
  if (!!result.error) return res.status(400).json({ message: result.error });

  const moovieExist = result.data.map((t) => t.id).includes(MoovieId);

  if (!moovieExist)
    return res
      .status(400)
      .json({ message: `Moovie with id '${id}' doesn't exist !` });

  const newMooviesList = result.data.filter((t) => t.id !== MoovieId);

  const dataJson = JSON.stringify({ moovies: newMooviesList });

  const error = await mooviesDAO.write(dataJson);
  if (!!error) return res.status(400).json({ message: error });

  res.status(200).json({
    message: `Moovie successfully deleted`,
    moovieDeleted: MoovieId,
  });
};

// ------------------------------------------------------------------- UPDATE

const update = async (req, res) => {
  const { MoovieId, name, userId } = req.body;

  const result = await mooviesDAO.read(userId);
  if (!!result.error)
    return res.status(400).json({ message: result.data.error });

  const moovieExist = result.data.map((t) => t.id).includes(MoovieId);
  if (!moovieExist)
    return res
      .status(400)
      .json({ message: `Moovie with id "${MoovieId}" doesn't exist !` });

  const newMooviesList = result.data.map((t) =>
    t.id === MoovieId ? { ...t, name: name } : { ...t }
  );

  const dataJson = JSON.stringify({ moovies: newMooviesList });

  const error = await mooviesDAO.write(dataJson);
  if (!!error) return res.status(400).json({ message: error });

  res.status(200).json({
    message: `Moovie successfully updated`,
    moovieUpdated: MoovieId,
  });
};

export const mooviesController = {
  get,
  getAll,
  create,
  update,
  deleteT,
};
