const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const passport = require("passport");
const path = require("path");
const os = require("os");
const cluster = require("cluster");

app.use(logger("dev"));
app.use(express.json({ extended: true }));

const clusterWorkerSize = os.cpus().length;

// For form Data
//app.use(formidable());
// For Form Data
//app.use(upload.array());
app.use(express.urlencoded());
app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")));

app.use(passport.initialize());

connectDB();

const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.send("Hello");
// });

app.use("/api/v1/auth", require("./routes/auth/auth"));
app.use("/api/v1/dsat", require("./routes/DSAT/exam"));
app.use("/api/v1/result", require("./routes/DSAT/result"));
app.use("/api/v1/admin", require("./routes/admin/adminAuth"));

// Distributing load between various cpus.
if (clusterWorkerSize > 1) {
  if (cluster.isMaster) {
    for (let i = 0; i < clusterWorkerSize; i++) {
      cluster.fork();
    }

    cluster.on("exit", function (worker) {
      console.log("Worker", worker.id, " has exitted.");
    });
  } else {
    const app = express();

    app.listen(PORT, function () {
      console.log(
        `Express server listening on port ${PORT} and worker ${process.pid}`
      );
    });
  }
} else {
  const app = express();

  app.listen(PORT, function () {
    console.log(
      `Express server listening on port ${PORT} with the single worker ${process.pid}`
    );
  });
}

// app.listen(PORT, () => {
//   console.log("Server running on PORT : ", PORT);
// });

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
