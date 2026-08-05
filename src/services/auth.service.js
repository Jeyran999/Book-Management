const userRepository = require("../repositories/user.repository");
const AppError = require("../utils/appError");
const { hashPassword, comparePassword } = require("../utils/password");
const { generateToken } = require("../utils/jwt");

const register = async (userData) => {
  const { username, email, password } = userData;

  const existingEmail = await userRepository.findByEmail(email);

  if (existingEmail) throw new AppError("Email already exists", 409);

  const existingUsername = await userRepository.findByUsername(username);

  if (existingUsername) throw new AppError("Username already exists", 409);

  const hashedPassword = await hashPassword(password);

  const user = await userRepository.create({
    ...userData,
    password: hashedPassword,
  });

  return user;
};

const login = async (email, password) => {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const userInfo = {
    username: user.username,
    email: user.email,
    role: user.role,
  };
  const token = generateToken({
    userId: user._id,
    role: user.role,
  });

  return { userInfo, token };
};
module.exports = { register, login };
