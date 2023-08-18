import { emailIsValid } from "../utils/regex.utils.js";
import { Schema, createCollection } from "../config/mongoose.config.js";

const USER_ROLE = {
  ADMIN: "admin",
  MEMBER: "member",
};

// creation du schema user
const userSchema = new Schema({
  // definition des differentes props et leur type
  email: {
    type: String,
    validate: {
      // validator: emailIsValid,
      // validator: (email) => {
      //   return regexIsOk(REGEX.email, email);
      // },
      validator: (email) => {
        const isOk = emailIsValid(email);
        // isOk est un booleen
        return isOk;
      },
      message: "Email is not valid !",
    },
  },
  role: {
    type: String,
    // valeur par defaut si le role n'est pas renseigne
    default: USER_ROLE.MEMBER,
    enum: {
      values: [USER_ROLE.ADMIN, USER_ROLE.MEMBER], // la valeur de la props role ne peut etre que soit "admin" ou bien "member"
      // erreur si la valeur du role ne correspond pas au valeurs attendues par l'enum
      message: "This role does not exist",
    },
  },
  password: String,
  // pseudo: { type: String, required: [true, "Le pseudo est requis"] },
  // pseudo: { type: String, default: "Anonyme user" },
  pseudo: {
    type: String,
    // propriete validate qui doit avoir 2 props: validator et message
    validate: {
      // validator doit etre une fonction qui prend en parametre la valeur du champs, et qui return un booleen
      // si return false => l'insertation n'est pas valide
      validator: (value) => {
        // je veux que la valeur soit nulle ou bien, si elle n'est pas nulle, doit etre superieur a 10
        if (value === null || value.trim().length > 4) {
          return true;
        } else {
          return false;
        }
      },
      message: "",
    },
  },
  tel: Number,
});

// creation d'un model a partir du schema
const User = createCollection("User", userSchema);
// mongoose va utiliser le nom "User" pour creer une collections "users"

export default User;
