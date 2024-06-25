require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3500;
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./DataBase/dbConnect");
const mongoose = require("mongoose");
const { logEvents, logger } = require("./middleware/logger");

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
connectDB();

// app.use("/", express.static(path.join(__dirname, "public"))); //✅
app.use(express.static("public")); // ✅

app.use("/", require("./routes/root"));
app.use("/users", require("./routes/userRoutes"));
app.use("/notes", require("./routes/noteRoutes"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found!" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(errorHandler);

// db connection
mongoose.connection.once("open", () => {
  app.listen(port, () => {
    console.log("⚙️  Server is running at: http://localhost:%d", port);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErr.log"
  );
});
