import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string); // typed

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
