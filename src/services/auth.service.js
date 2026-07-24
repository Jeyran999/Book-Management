const userRepository = require("../repositories/user.repository");
const { hashPassword } = require("../utils/password");

const register = async (userData) => {
  const hashedPassword = await hashPassword(userData.password);

  const user = await userRepository.create({
    ...userData,
    password: hashedPassword,
  });

  return user;
};

module.exports = { register };
