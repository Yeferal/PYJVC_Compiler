const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Settings
app.set("port", process.env.PORT || 9000);

// Middlewares
const corsOptions = {origin: "http://localhost:4200"}
app.use(cors({origin: "http://localhost:4200"}));
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/pyjvc", require("./routes/index.routes"));
app.use("/pyjvc", require("./routes/files.routes"));

module.exports = app;