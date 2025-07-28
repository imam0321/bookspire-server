import bcryptjs from "bcryptjs";
import { envVars } from "../config/env.js";
import { User } from "../modules/user/user.model.js";

export const seedAdmin = async () => {
  try {
    const isAdminExist = await User.findOne({
      email: envVars.ADMIN_EMAIL,
    });

    if (isAdminExist) {
      return;
    }

    const hashedPassword = await bcryptjs.hash(
      envVars.ADMIN_PASSWORD,
      10
    );

    const authProvider = {
      provider: "Credential",
      providerId: envVars.ADMIN_EMAIL,
    };

    const payload = {
      name: "Admin",
      email: envVars.ADMIN_EMAIL,
      role: "admin",
      password: hashedPassword,
      isVerified: true,
      auths: [authProvider],
    };

    await User.create(payload);
  } catch (error) {
    console.log(error);
  }
};
