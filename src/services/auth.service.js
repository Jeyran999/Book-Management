const userRepository = require("../repositories/user.repository");
const { hashPassword, comparePassword } = require("../utils/password");
const { generateToken } = require("../utils/jwt");

const register = async (userData) => {
  const { username, email, password } = userData;

  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await hashPassword(userData.password);

  const user = await userRepository.create({
    ...userData,
    password: hashedPassword,
  });

  return user;
};

const login = async (email, password) => {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({
    userId: user._id,
  });

  return { user, token };
};
module.exports = { register, login };
