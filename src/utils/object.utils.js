export const omit = (obj, props) => {
  // props => "password"
  // obj   => user: { id, email, pseudo, password }

  const keys = Object.keys(obj); // ["id", "email", "pseudo", "password"]

  const newObj = {};

  keys.forEach((key) => {
    // au tour 1 => key = "id"
    if (key !== props) {
      // newObj.id = obj.id
      newObj[key] = obj[key];
    }
  });

  return newObj;
};

export const omit_ = (obj, key) => {
  const { [key]: keyValue, ...otherValues } = obj;
  return otherValues;
};

export const omitMulti = (obj, keys) => {
  let newObj = { ...obj };

  keys.forEach((k) => {
    const o = omit(newObj, k);
    newObj = { ...o };
  });

  return newObj;
};

export const omitMulti_ = (obj, keys) => {
  const otherValues = keys.reduce(
    (toBuild, key) => {
      const o = omit(toBuild, key); // {id, email}
      return { ...o }; // toBuild = { id, email }
    },
    { ...obj }
  );

  return otherValues;
};

export const omitMulti_bg = (o, keys) =>
  keys.reduce((tb, k) => ({ ...omit(tb, k) }), { ...o });
