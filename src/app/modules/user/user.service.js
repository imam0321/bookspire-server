import { User } from "./user.model.js";

const createUser = async (payload) => {
  const { name, email, password } = payload;
  const user = await User.create({ name, email, password });
  return user;
};

export const UserServices = {
  createUser,
};
