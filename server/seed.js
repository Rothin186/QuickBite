const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Direct connection string
const uri = "mongodb://admin:Rathindra123@ac-vjkcfsn-shard-00-00.6onkiw4.mongodb.net:27017,ac-vjkcfsn-shard-00-01.6onkiw4.mongodb.net:27017,ac-vjkcfsn-shard-00-02.6onkiw4.mongodb.net:27017/quickbite?ssl=true&replicaSet=atlas-14nl0e-shard-0&authSource=admin&appName=Cluster0";

const User = require("./models/User");

const createAdmin = async () => {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      family: 4,
    });
    console.log("✅ MongoDB Connected!");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@quickbite.com" });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists!");
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    // Create admin user
    const admin = await User.create({
      name: "QuickBite Admin",
      email: "admin@quickbite.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin user created successfully!");
    console.log("📧 Email: admin@quickbite.com");
    console.log("🔑 Password: admin123");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

createAdmin();