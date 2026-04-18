const { User } = require("../config/db");
const jwt = require("jsonwebtoken");

// REGISTER
exports.registerUser = async (req, res) => {
  try {
    const { email, password, role, tenant } = req.body;

    if (!email || !password || !tenant) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await User.findOne({ email, tenant });
    if (exists) {
      return res.status(400).json({ message: "User exists in this tenant" });
    }

    const user = await User.create({ email, password, role, tenant });

    const token = jwt.sign(
      { id: user._id, role: user.role, tenant: user.tenant },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password, tenant } = req.body;

    const user = await User.findOne({ email, tenant });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, tenant: user.tenant },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};