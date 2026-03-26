require("dotenv").config();
const express = require("express");
const cors = require("cors");
// connect database
const { connectDB, User } = require('./config/db'); // FIXED

const app = express();

app.use(cors());
app.use(express.json());

connectDB();
const jwt = require("jsonwebtoken");
//Register a new User
app.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create new user
    const user = await User.create({
      email,
      password, // will be hashed automatically
      role,
    });

    res.status(201).json({
      message: "User created",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Login a user for getting token
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 2. Compare password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 3. CREATE TOKEN (NEW)
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 4. Success response
    res.json({
      message: "Login successful",
      token, //  ADD THIS
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
const fileRoutes = require("./routes/fileRoutes");

app.use("/api/files", fileRoutes);

const PORT = process.env.PORT ;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});