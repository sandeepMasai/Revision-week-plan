const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

const users = [];

// REGISTER
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = users.find((u) => u.email === email);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      id: Date.now(),
      email,
      password: hashedPassword,
    };

    users.push(user);

    const token = generateToken({ id: user.id, email: user.email });

    return res.status(201).json({ message: "User Register Successful", token });
  } catch (error) {
    console.log("Register Error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({ id: user.id, email: user.email });

    return res.json({ message: "User Login Successful", token });
  } catch (error) {
    console.log("Login error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// PROFILE
exports.profile = (req, res) => {
  return res.json({ message: "Profile Access", user: req.user });
};
