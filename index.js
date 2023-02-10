const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require('./routes/v1/users.route');
const authRoute = require('./routes/v1/auth.route');
const postRoute = require('./routes/v1/post.route');

mongoose.set('strictQuery', false);

dotenv.config();


mongoose.connect(process.env.MONGO_URL, () => {
    console.log("connected to MongoDB");
});


// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


app.get("/", (req, res) => {
    res.send("Welcome to homepage");
});


app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/posts", postRoute);


app.listen(8800, () => {
    console.log("Backend server is running!");
})