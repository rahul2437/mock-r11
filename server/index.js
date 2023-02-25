const express = require("express");
const { connection } = require("./config/db");
const cors = require("cors");
const userRouter = require("./routes/user.route");
require("dotenv").config();

const app = express();
// REQUIRED FOR USING IN OTHER NETWORKS
app.use(
  cors({
    origin: "*",
  })
);
// FOR CONVERTING PAYLOAD TO JSON
app.use(express.json());

// User Route
app.use("/user", userRouter);
// Base URL
app.get("/", (req, res) => {
  res.json({ message: "WELCOME TO Authentication App API" });
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(
      `Server listening on port http://localhost:${process.env.PORT}`
    );
  } catch (error) {
    console.log(error.message);
  }
});
