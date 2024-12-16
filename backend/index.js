const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const PORT = 8001;
const app = express();
const fetchData = require("./fetchData");
const userRouter = require("./routes/user");
const cartRouter = require("./routes/cart");

const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const cookieParser = require("cookie-parser");

mongoose.connect("mongodb://localhost:27017/foodApp").then(() => {
  console.log("Connected to MongoDB");
});

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.json());

app.get("/api/userData", async (req, res) => {
  const user = req.user;
  console.log("User:", user);
  res.json({ user });
});


app.get("/api/itemsData", async (req, res) => {
  let data;
  try {
    const response = await fetchData();
    data = response.request;
  } catch (error) {
    console.error(error);
    data = [];
  }
  res.json(data);
})

app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);

app.use(express.static(path.join(__dirname, "frontend/dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
