import bcrypt from "bcrypt";

const SALT_ROUND = 10;

export const hash = async (password) => {
  let error = null;
  let hashed = null;

  try {
    hashed = await bcrypt.hash(password, SALT_ROUND);
  } catch (e) {
    error = `Error when hash: ${e.message}`;
  } finally {
    return { hashed, err: error };
  }
};

export const compareHash = async (password, toCompare) => {
  let error = null;
  let match = false;

  try {
    match = await bcrypt.compare(password, toCompare);
  } catch (e) {
    error = `Error when compare: ${e.message}`;
  } finally {
    return { match, err: error };
  }
};
