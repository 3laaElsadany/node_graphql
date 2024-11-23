const mongoose = require('mongoose');
const url = process.env.DB_URL;
mongoose.connect(url)
  .then(() => {
    console.log("Connected To DB")
  })
  .catch(err => {
    console.log("Error: " + err.message);
  })