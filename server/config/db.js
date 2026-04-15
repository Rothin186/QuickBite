const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = "mongodb://admin:Rathindra123@ac-vjkcfsn-shard-00-00.6onkiw4.mongodb.net:27017,ac-vjkcfsn-shard-00-01.6onkiw4.mongodb.net:27017,ac-vjkcfsn-shard-00-02.6onkiw4.mongodb.net:27017/quickbite?ssl=true&replicaSet=atlas-14nl0e-shard-0&authSource=admin&appName=Cluster0";
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;