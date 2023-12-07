import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import giftRouter from "./routes/gift.js";

dotenv.config();
const app = express();
const port = process.env.PORT_DEFAULT;
app.use(cors());

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL, {});
    console.log(`MongoDB connected successfully`);
  } catch (error) {
    console.log("MongoDB connected successfully");
  }
};
dbConnect();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/gift", giftRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
