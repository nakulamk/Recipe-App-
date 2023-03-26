const express = require("express");
const { json } = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const recipeRouter = require("./routes/recipeRouter");

const app = express();

// app.use(express(json));
app.use(express.json());
app.use(cors());

// dotenv.config({ path: "../config.env" });

const DB =
  "mongodb+srv://gowdanakula7:AvBeulKQLyFaQKdZ@cluster0.ld3u7ke.mongodb.net/recipe?retryWrites=true&w=majority";

// const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    // console.log(con.connection);
    console.log("DB connection sucessfull");
  })
  .catch((err) => {
    console.log(err);
  });
mongoose.set("strictQuery", true);

app.use("/auth", userRouter);
app.use("/recipies", recipeRouter);

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
