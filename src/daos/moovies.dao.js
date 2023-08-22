import Moovie from "../model/moovie.model.js";

const read = async () => {
  let data = null;
  let error = null;

  try {
    data = await Moovie.find();
    console.log(data);
  } catch (e) {
    console.error(e.message);
    error = `Cannot read Moovie: ${e.message}`;
  } finally {
    return { error, data };
  }
};

export const mooviesDAO = {
  read,
};
