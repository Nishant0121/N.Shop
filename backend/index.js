import express from "express";
import productRouter from "./routers/products.js";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/mongo.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "https://n-shop-lyart.vercel.app/", // Replace with your frontend's actual origin
  })
);

// test router

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Use the router

app.use("/api/product", productRouter);

// Start the server
app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port http://localhost:${port}`);
});
