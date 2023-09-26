export const getUserInfos = (user) => {
  const formatedUser = {
    id: user._id,
    tel: user.tel,
    role: user.role,
    email: user.email,
    pseudo: user.pseudo,
    FavorisMoviesAdd: user.FavorisMoviesAdd,
    darkMode: user.darkMode,
  };

  return formatedUser;
};
