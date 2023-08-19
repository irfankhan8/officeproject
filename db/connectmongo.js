import mongoose from "mongoose";
const connectDB = async (DATABASE_URL) => {
  try {
    const DB_OPIONS = {
      dbName:  process.env.DATA_NAME 
    };
    await mongoose.connect(DATABASE_URL, DB_OPIONS);
    console.log("connect mongoose successfully......");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
