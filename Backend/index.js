const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const booksRoute = require('./routes/bookroutes')
dotenv.config();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is running!");
});


app.use('/books',booksRoute);

const PORT = process.env.PORT || 5004;


mongoose.connect(process.env.MONGODBURI)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log("MongoDB connection error", error));


app.listen(PORT, () => {
  console.log(`app is running at port:${PORT}`)
});