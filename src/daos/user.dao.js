import fs from "node:fs/promises";
import User from "../model/user.model.js";

const { readFile, writeFile } = fs;
const CURRENT_DIR = process.cwd();

const readAll = async (userId) => {
  // on part du principe d'avoir un user ou une erreur, les deux init a null
  let users = null;
  let error = null;

  try {
    // on essaye de recup des users avec un filtre
    // la methode findById permet de recup un model directement via son id
    // ici l'id est envoye direct en tant que param de la fonction
    const result = await User.find();
    // sinon on attribue le user
    users = result;
  } catch (e) {
    console.error(e.message);
    // definition de l'erreur si on passe dans le catch
    error = `Cannot read users: ${e.message}`;
  } finally {
    // retour de l'erreur et du resultat; un des deux est forcement null
    return { error, users };
  }
};

const readById = async (userId) => {
  // on part du principe d'avoir un user ou une erreur, les deux init a null
  let user = null;
  let error = null;

  try {
    // on essaye de recup un user avec un id
    // la methode findById permet de recup un model directement via son id
    // ici l'id est envoye direct en tant que param de la fonction
    const result = await User.findById(userId);
    // si result === null => on leve une erreur avec un message specifique
    if (!result) throw new Error(`User with id ${userId} not found`);
    // sinon on attribue le user
    user = result;
  } catch (e) {
    console.error(e.message);
    // definition de l'erreur si on passe dans le catch
    error = `Cannot read user by id: ${e.message}`;
  } finally {
    // retour de l'erreur et du resultat; un des deux est forcement null
    return { error, user };
  }
};

const readByEmail = async (userEmail) => {
  // on part du principe d'avoir un user ou une erreur, les deux init a null
  let user = null;
  let error = null;

  try {
    // on essaye de recup un user avec un email
    // la methode findOne sur un model donne attend un filtre en parametre
    // ici le filtre via l'email
    const result = await User.findOne({ email: userEmail });
    // si result === null => on leve une erreur avec un message specifique
    if (!result) throw new Error(`User with email ${userEmail} not found`);
    // sinon on attribue le user
    user = result;
  } catch (e) {
    console.error(e.message);
    // definition de l'erreur si on passe dans le catch
    error = `Cannot read user by email: ${e.message}`;
  } finally {
    // retour de l'erreur et du resultat; un des deux est forcement null
    return { error, user };
  }
};

const signUp = async (email, password, pseudo, tel, role) => {
  let error = null;
  let result = null;

  // premiere methode
  const user = { email, password, pseudo, tel, role };

  try {
    const createdUser = await User.create(user);
    result = createdUser;
  } catch (e) {
    console.log(e.message);
    error = e.message;
  } finally {
    return { result, error };
  }

  // deuxieme methode
  // const user_ = new User({
  //   email,
  //   password,
  //   pseudo,
  // });
  // await user_.save();
};

export const UserDAO = {
  signUp,
  readByEmail,
};
