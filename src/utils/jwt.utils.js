import jwt from "jsonwebtoken";
// import { secret } from "../config/jwt.config.js";
import { stringIsFilled } from "./string.utils.js";

export const secret = process.env.JWT_SECRET || "JWT_SECRET";

const jwtOptions = {
  expiresIn: `28800000`, // 8h
};

export const jwtVerify = (token) => {
  try {
    if (!secret) throw new Error("Secret must be defined!");
    const decoded = jwt.verify(token, secret);
    const userId = decoded.data;
    return stringIsFilled(userId) ? userId : null;
  } catch (err) {
    console.error(`jwtVerify: error => `, err.message);
    return null;
  }
};

export const jwtSign = (data) => jwt.sign({ data: data }, secret, jwtOptions);
