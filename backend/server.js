const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');
const stocksRouter = require('./routes/stocks');
const walletRouter = require('./routes/wallet');
const housesRouter = require('./routes/houses');
const landsRouter = require('./routes/lands');
const itemsRouter = require('./routes/items');

app.use('/users', usersRouter);
app.use('/stocks', stocksRouter);
app.use('/wallet', walletRouter);
app.use('/houses', housesRouter);
app.use('/lands', landsRouter);
app.use('/items', itemsRouter);

// var path = require('path');
// app.use(express.static(path.join(__dirname, 'public')));



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});