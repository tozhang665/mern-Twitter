const express = require("express");
const mongoose = require("mongoose")
const users = require("./config/routes/api/users")
const tweets = require("./config/routes/api/tweets")
const db = require('./config/keys').mongoURI
const bodyParser = require('body-parser');

const app = express();


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use("/api/users", users);
app.use("/api/tweets", tweets);

app.get("/", (req,res) => res.send("Hello World!"));


