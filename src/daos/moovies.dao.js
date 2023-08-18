import fs from "node:fs/promises";

const { readFile, writeFile } = fs;
const CURRENT_DIR = process.cwd();

const read = async () => {
  let data = null;
  let error = null;

  try {
    const jsonData = await readFile(
      `${CURRENT_DIR}/src/fakedata/pokemon.data.json`,
      "utf8"
    );
    const result = JSON.parse(jsonData);
    data = result.results;
  } catch (e) {
    console.error(e.message);
    error = `Cannot read Pokemons: ${e.message}`;
  } finally {
    return { error, data };
  }
};

const write = async (data) => {
  let error = null;

  try {
    const jsonData = await writeFile(
      `${CURRENT_DIR}/src/fakedata/pokemon.data.json`,
      JSON.stringify(data, null, 2),
      "utf8"
    );
  } catch (e) {
    console.error(e.message);
    error = `Cannot write Pokemons: ${e.message}`;
  } finally {
    return error;
  }
};

export const mooviesDAO = {
  read,
  write,
};
