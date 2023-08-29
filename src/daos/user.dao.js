import User from "../model/user.model.js";
import Moovie from "../model/moovie.model.js";

const readById = async (userId) => {
  // on part du principe d'avoir un user ou une erreur, les deux init a null
  let user = null;
  let error = null;

  try {
    // on essaye de recup un user avec un id
    // la methode findById permet de recup un model directement via son id
    // ici l'id est envoye direct en tant que param de la fonction
    const result = await User.findById({ _id: userId });
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

const signUp = async (pseudo, email, password, role, moovie) => {
  let error = null;
  let result = null;

  try {
    // premiere methode
    const { user } = await readByEmail(email);
    if (!!user) throw new Error(`User with email ${email} already exist`);

    const MoviesAdded = !moovie ? [] : await Moovie.insertMany(moovie);

    const createdUser = await User.create({
      pseudo,
      email,
      password,
      role,
      // lien entre les models crees en bdd et le user
      MoviesAdded,
    });
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

const deleteOne = async (userId) => {
  let error = null;
  let deletedUser = null;

  try {
    // suppression du user via son id avec la methode deleteOne et le filtre approprie
    const result = await User.deleteOne({ _id: userId });
    // si pas ou plus d'1 document est supprime => erreur
    if (result.deletedCount !== 1)
      throw new Error(
        `Something goes wrong - deleted count: ${result.deletedCount}`
      );

    // on renvoi au client l'id du user qui a ete supprime
    deletedUser = userId;
  } catch (e) {
    console.error(e.message);
    error = e.message;
  } finally {
    return { error, deletedUser };
  }
};

const updatePseudo = async (id, pseudo) => {
  let error = null;
  let updatedUser = null;

  try {
    // 1ere methode
    // recuperation du user depuis la BDD via son id
    const user = await User.findById(id);
    // si user === null => on leve une erreur
    if (!user) throw new Error(`User with id ${id} not found`);
    // modifiation du user et de la props voulue
    user.pseudo = pseudo || user.pseudo; // { _id, email ...}
    // sauvegarde de la modification
    updatedUser = await user.save();

    // 2eme methode
    // // mise a jour direct du user en utilisant le filtre id et la props pseudo
    // // updatedOne prend deux params: le premier est un objet representant le filtre, le deuxieme la props a modifier
    // updatedUser = await User.updateOne({ _id: id }, { pseudo: pseudo });
    // // si pas ou plus de 1 element modifie => on leve une erreur
    // if (updatedUser.modifiedCount !== 1)
    //   throw new Error(`Something goes wrong ${updatedUser.modifiedCount}`);
  } catch (e) {
    console.error(e.message);
    error = e.message;
  } finally {
    return { error, updatedUser };
  }
};

const updateFavMovies = async (id, favorisMovies) => {
  let error = null;
  let updatedUser = null;

  try {
    // 1ere methode
    // recuperation du user depuis la BDD via son id
    const user = await User.findById(id);
    // si user === null => on leve une erreur
    if (!user) throw new Error(`User with id ${id} not found`);
    // modifiation du user et de la props voulue
    user.FavorisMoviesAdd = user.FavorisMoviesAdd.push(favorisMovies);
    // sauvegarde de la modification
    updatedUser = await user.save();

    // 2eme methode
    // // mise a jour direct du user en utilisant le filtre id et la props pseudo
    // // updatedOne prend deux params: le premier est un objet representant le filtre, le deuxieme la props a modifier
    // updatedUser = await User.updateOne({ _id: id }, { pseudo: pseudo });
    // // si pas ou plus de 1 element modifie => on leve une erreur
    // if (updatedUser.modifiedCount !== 1)
    //   throw new Error(`Something goes wrong ${updatedUser.modifiedCount}`);
  } catch (e) {
    console.error(e.message);
    error = e.message;
  } finally {
    return { error, updatedUser };
  }
};

const getUserWithMovies = async (userId) => {
  let user = null;
  let error = null;

  try {
    // recup du user via son id ET de tous les todos associes grace a la methode populate
    user = await User.findById(userId).populate("FavorisMoviesAdd");
    // user = await User.findById(userId).populate({ path: "todosCreated", select: "value" });
    if (!user) throw new Error(`User with id ${userId} not found`);
  } catch (e) {
    console.error(e.message);
    error = e.message;
  } finally {
    return { error, user };
  }
};

export const UserDAO = {
  signUp,
  readById,
  readByEmail,
  deleteOne,
  updatePseudo,
  updateFavMovies,
  getUserWithMovies,
};
