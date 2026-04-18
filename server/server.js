require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { connectDB } = require("./config/db");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

// ================= DATABASE =================
connectDB();

// ================= ROUTES =================

// Auth Routes
app.use("/api/auth", require("./routes/authRoutes"));

// File / Video Routes
app.use("/api/files", require("./routes/fileRoutes"));

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});