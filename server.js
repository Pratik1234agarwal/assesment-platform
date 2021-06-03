const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const passport = require("passport");
const path = require("path");

app.use(logger("dev"));
app.use(express.json({ extended: true }));
app.use(express.urlencoded());
app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")));

app.use(passport.initialize());

connectDB();

const PORT = process.env.PORT || 80;

// app.get("/", (req, res) => {
//   res.send("Hello");
// });

app.use("/api/v1/auth", require("./routes/auth/auth"));
app.use("/api/v1/dsat", require("./routes/DSAT/exam"));
app.use("/api/v1/result", require("./routes/DSAT/result"));
app.use("/api/v1/admin", require("./routes/admin/adminAuth"));

app.listen(PORT, () => {
  console.log("Server running on PORT : ", PORT);
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
