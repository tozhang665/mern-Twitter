const express = require("express");
const mongoose = require("mongoose")
const users = require("./config/routes/api/users")
const tweets = require("./config/routes/api/tweets")
const db = require('./config/keys').mongoURI
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  
  
  
  app.use(passport.initialize());
  require('./config/passport')(passport);
  
  
  const port = process.env.PORT || 5000;
  
  app.use("/api/users", users);
  app.use("/api/tweets", tweets);

app.listen(port, () => console.log(`Server is running on port ${port}`));



