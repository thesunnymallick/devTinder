const express = require("express");
const cookieParser=require("cookie-parser")
const connectDB = require("./config/db");
const authRouter = require("./routes/authRoutes");
const profileRoute = require("./routes/profileRoute");
const app = express();

app.use(express.json());
app.use(cookieParser())

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/profile", profileRoute)






connectDB()
  .then(() => {
    console.log("database connection successfully");
    app.listen(8000, () => {
      console.log(`Server starting port ${8000}`);
    });
  })
  .catch((err) => {
    console.log("database connection failed!", err);
});
