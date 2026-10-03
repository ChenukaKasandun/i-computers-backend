console.log("Hello World..!");

// MongoDb connection
const mongoURI =
  "mongodb+srv://chalithachenuka123_db_user:12345@cluster0.hdri30p.mongodb.net/?appName=Cluster0";

mongoose.connect(mongoURI).then(() => {
  console.log("Connected to MongoDB Cluster");
});

// Imprting Express framework to the project backennd
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/UserRouter.js";
import jwt from "jsonwebtoken";
import productRouter from "./routes/ProductRouter.js";

// Full express application is comming here
const app = express();

// Adding middlewares to handle json requests
app.use(express.json());

// For authentication middleware
app.use((req, res, next) => {
  const authorizationHeader = req.header("Authorization");

  if (authorizationHeader) {
    // To remove the "Bearer " part in the token comming from the request
    const token = authorizationHeader.replace("Bearer ", "");
    console.log(token);

    // Decrypting the payload
    jwt.verify(token, "secretKey96$2025", (error, content) => {
      if (content == null) {
        console.log("Invalid Token");
        res.json({
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
app.use("/users", userRouter);
// plug the productRouter
app.use("/products", productRouter);

// Arrow Function
app.listen(5000, () => {
  console.log("Server is Running..!");
});
