const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

const errorMiddleware = require("./middlewares/errorMiddleware");
const databaseConnect = require("./utils/db");

require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser())

app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/adminAuthRoutes"));

app.use(errorMiddleware);

const port = process.env.PORT;

databaseConnect();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
