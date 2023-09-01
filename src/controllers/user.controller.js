import { UserDAO } from "../daos/user.dao.js";
import { jwtSign } from "../utils/jwt.utils.js";
import { getUserInfos } from "../utils/user.utils.js";
import { compareHash, hash } from "../utils/hash.utils.js";

const getUser = async (req, res) => {
  const { userId } = req.body;
  const result = await UserDAO.readById(userId);
  if (!!result.error) return res.status(400).json({ message: result.error });

  return res.json({ user: result.user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const message = `Authentification failed`;

  // on recup le user et l'erreur depuis la BDD via son email
  const { user, error } = await UserDAO.readByEmail(email);
  // si erreur => envoi de l'erreur au client
  if (!!error) return res.status(400).json({ message });

  // verif de l'authentification
  const { match, err } = await compareHash(password, user.password);
  if (!match || !!err) return res.status(400).json({ message: err || message });

  // creation d'un token
  const token = jwtSign(user.id);

  // envoi de la reponse finale avec message, user, et token
  return res.json({
    message: `login successfull`,
    user: getUserInfos(user),
    token,
  });
};

const signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;

  const { hashed, err } = await hash(password);
  if (!!err || !hashed) return res.status(400).json({ message: err });

  const { result, error } = await UserDAO.signUp(
    pseudo,
    email.toLowerCase(),
    hashed
  ); //tolowercase car Regex ne gere pas les majuscules
  if (!result || !!error) return res.status(400).json({ message: error });

  const token = jwtSign(result.id);

  return res.json({
    message: `sign up successfull`,
    user: getUserInfos(result),
    token,
  });
};

const updatePseudo = async (req, res) => {
  const { pseudo, userId } = req.body;

  const { error, updatedUser } = await UserDAO.updatePseudo(userId, pseudo);
  if (!!error) return res.status(400).json({ message: error });

  return res.json({
    message: `User updated successfully`,
    user: getUserInfos(updatedUser),
  });
};

const updateFavMovies = async (req, res) => {
  const { userId, favorisMovies, deleteFromFav } = req.body;

  const { error, updatedUser } = await UserDAO.updateFavMovies(
    userId,
    favorisMovies,
    deleteFromFav
  );
  console.log(favorisMovies);
  console.log(deleteFromFav);
  if (!!error) return res.status(400).json({ message: error });

  return res.json({
    message: `User FavMovies updated successfully`,
    user: getUserInfos(updatedUser),
  });
};

const deleteOne = async (req, res) => {
  const { userId } = req.body;

  const { error, deletedUser } = await UserDAO.deleteOne(userId);
  if (!!error) return res.status(400).json({ message: error });

  return res.json({ message: `User deleted successfully`, user: deletedUser });
};

const getUserWithMovies = async (req, res) => {
  const { userId } = req.body;

  const { error, user } = await UserDAO.getUserWithMovies(userId);
  if (!!error || !user)
    return res.status(400).json({ message: error || "user not found" });

  return res.json({ message: `User_fetched`, user: user });
};

export const UserController = {
  login,
  signUp,
  getUser,
  deleteOne,
  updatePseudo,
  getUserWithMovies,
  updateFavMovies,
};
