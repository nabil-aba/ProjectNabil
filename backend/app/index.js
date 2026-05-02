const { PORT = 19025 } = process.env;
require("dotenv").config();
const express = require("express");
const routes = require("../routes");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const sitemap = require("../sitemap.js");
const cookieParser = require("cookie-parser");

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms"),
);

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:19025",
  "https://project.nabilaba.my.id",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "./../uploads")));
app.use("/api", routes);
app.use(express.static(path.join(__dirname, "./../dist")));
app.use("/sitemap.xml", sitemap);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./../dist/index.html"));
});

app.listen(PORT, () => {
  console.log("Listening on PORT", PORT);
});
