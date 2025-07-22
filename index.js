import express from "express";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import { connectDB } from "./database/mongoDB.js";

const port = process.env.PORT;
const url = process.env.MONGO_URL;

connectDB(url);
const app = express();
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(adminRouter);
app.get("/", (req, res) => {
  res.json("hok");
});

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
