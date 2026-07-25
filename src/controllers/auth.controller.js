const authService = require("../services/auth.service");

const register = async (req, res, next) => {
  try {
    const newUser = await authService.register(req.body);

    return res
      .status(201)
      .json({
        message: "User created successfully",
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
