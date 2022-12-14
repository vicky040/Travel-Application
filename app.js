import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routing/user-routes";
import postRouter from "./routing/post-routes";
import cors from "cors";
import  Path  from "path";

const app = express();
dotenv.config();

// middlewares
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/posts", postRouter);

// connect frontend 
app.use(express.static(Path.join("./frontend/build"))); 
app.get("*" , (req,res)=> {
  res.sendFile(Path.join("./frontend/build/index.html"))
})


// connections
mongoose
  .connect(
    "mongodb+srv://vicky:vic@cluster0.3ifpvrn.mongodb.net/TravelBlogretryWrites=true&w=majority"
  )
  .then(() =>
    app.listen(5000, () =>
      console.log("Connection Succesfull  & Listening to localhost Port 5000")
    )
  )
  .catch((err) => console.log(err));
