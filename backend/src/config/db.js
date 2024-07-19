import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const dbUrl = process.env.MONGO_URI 

    const connectionInstance = await mongoose.connect(dbUrl);
    console.log(`Database Connected to ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("Error connecting to database");
  }
};

export default connectDb