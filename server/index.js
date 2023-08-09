// index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import TodoListRoutes from "./routes/api/TodoList.js";
import homeRouter from "./routes/homeRouter.js"
import assetsRouter from "./routes/assestsRouter.js";

const app = express();
const publicPath = path.join(path.resolve(), "../client/public");
const distPath = path.join(path.resolve(), "../client/dist");

dotenv.config();

app.use(cors()); // to allow cross origin requests
app.use(bodyParser.json()); // to convert the request into JSON
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/xwww-

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB database Connected..."))
  .catch((err) => console.log(err));


if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(distPath));
} else {
  app.use("/", express.static(publicPath));
  app.use("/src", assetsRouter);
}

app.use("/api/todoList", TodoListRoutes);
app.use(homeRouter);

app.listen(process.env.PORT, () =>
  console.log(`App listening at http://localhost:${process.env.PORT}`)
);
