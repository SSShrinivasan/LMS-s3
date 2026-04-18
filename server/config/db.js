const mongoose = require("mongoose");
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const bcrypt = require("bcryptjs");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("DB Connection Failed:", error.message);
    process.exit(1);
  }
};

// User Schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },
    tenant: {
      type: String, // e.g. "tcs", "hcl"
      required: true,
    },
  },
  { timestamps: true }
);

//  ADD HOOK BEFORE MODEL
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  
});

//  ADD METHOD BEFORE MODEL
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// CREATE MODEL ONLY ONCE (AFTER everything)
const User = mongoose.model("User", userSchema);

module.exports = { connectDB, User };