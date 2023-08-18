export const getUserInfos = (user) => {
  const formatedUser = {
    id: user._id,
    tel: user.tel,
    role: user.role,
    email: user.email,
    pseudo: user.pseudo,
  };

  return formatedUser;
};
