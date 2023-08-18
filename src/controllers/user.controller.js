import { UserDAO } from "../daos/user.dao.js";
import { jwtSign } from "../utils/jwt.utils.js";
import { omit } from "../utils/object.utils.js";
import { getUserInfos } from "../utils/user.utils.js";

const getAll = async (req, res) => {
  const result = await UserDAO.read();
  if (!!result.error) return res.status(400).json({ message: result.error });

  return res.json({ users: result.users });
};

const login = async (req, res) => {
  const { email, pass } = req.body;
  const message = `Authentification failed`;

  // on recup le user et l'erreur depuis la BDD via son email
  const { user, error } = await UserDAO.readByEmail(email);
  // si erreur => envoi de l'erreur au client
  if (!!error) return res.status(400).json({ message });

  // verif de l'authentification
  if (!user || user.password !== password)
    return res.status(400).json({ message });

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
  const { email, password, pseudo, tel, role } = req.body;

  const { result, error } = await UserDAO.signUp(
    email,
    password,
    pseudo,
    tel,
    role
  );
  if (!result || !!error) return res.status(400).json({ message: error });

  const token = jwtSign(result.id);

  return res.json({
    message: `sign up successfull`,
    user: getUserInfos(result),
    token,
  });
};

export const UserController = {
  getAll,
  login,
  signUp,
};
