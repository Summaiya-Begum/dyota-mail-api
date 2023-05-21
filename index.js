const express = require("express");
const cors = require('cors');
const { connection } = require("./db");
const mailRoutes = require("./route/mail.route");
 require('dotenv').config()
const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => res.send("Welcome"));

app.use("/mail", mailRoutes);


connection
  .then(() => {
    app.listen(8080, () => {
      console.log("Server started on http://localhost:8080/");
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
  });
