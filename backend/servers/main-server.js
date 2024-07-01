require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const formData = require("express-form-data");
const os = require("os");
const path = require("path");

const authRouter = require("../routes/authRouter");
const { testDatabaseConnection } = require("../database/config/database");

testDatabaseConnection();

const port = process.env.MAIN_SERVER_PORT || 8000;

const options = {
  uploadDir: os.tmpdir(),
  autoClean: true,
}

const app = express();

app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());

app.use('/api/auth', authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
