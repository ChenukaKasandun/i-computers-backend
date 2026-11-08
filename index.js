console.log("Hello World..!");

// Imprting Express framework to the project backennd
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/UserRouter.js";
import jwt from "jsonwebtoken";
import productRouter from "./routes/ProductRouter.js";
import cors from "cors";
import dotenv from "dotenv";
// Load the values of dotenv file
dotenv.config();

// Mongo URL from .env file to connect to the database
const MONGOURI = process.env.MONGO_URL;

mongoose.connect(MONGOURI).then(() => {
  console.log("Connected to MongoDB Cluster");
});

// Full express application is comming here
const app = express();

// To enable all requests from the frontend even without auth header
app.use(cors());

// Adding middlewares to handle json requests
app.use(express.json());

// For authentication middleware
app.use((req, res, next) => {
  const authorizationHeader = req.header("Authorization");

  if (authorizationHeader) {
    // To remove the "Bearer " part in the token comming from the request
    const token = authorizationHeader.replace("Bearer ", "");

    // Decrypting the payload
    jwt.verify(token, process.env.JWT_SECRET, (error, content) => {
      if (content == null) {
        console.log("Invalid Token");
        res.status(401).json({
          message: "Invalid Token",
        });
      } else {
        console.log(content);
        // Passing the verified user details
        req.user = content;
        next();
      }
    });
  } else {
    // If the user is not containing a authorization header as he is login for the 1st time
    next();
  }
});

// plug the userRouter
app.use("/api/users", userRouter);
// plug the productRouter
app.use("/api/products", productRouter);

// Arrow Function
app.listen(5000, () => {
  console.log("Server is Running..!");
});
