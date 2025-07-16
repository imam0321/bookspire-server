import { User } from "./user.model.js";
import bcryptjs from "bcryptjs";

const createUser = async (payload) => {
  const { name, email, password } = payload;
  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new Error("User All Ready Exist");
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  const authProvider = {
    provider: "Credential",
    providerId: email,
  };

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    auths: [authProvider],
  });
  return user;
};

export const UserServices = {
  createUser,
};
