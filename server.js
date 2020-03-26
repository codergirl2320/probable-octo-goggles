// DEPENDENCIES
//=====================

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const session = require('express-session');
const db = mongoose.connection;
const dbupdateobject = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};


require('dotenv').config();

// MIDDLEWARE
//=====================


app.use(express.static('public'));
app.use(express.json());
app.use(session({
    secret:"feedmeseymour",
    resave:false,
    saveUninitialized:false
}));

// CONTROLLERS
//========================

const tripsController = require('./controllers/trips.js');
app.use('/trippr', tripsController);

const usersController = require('./controllers/users.js');
app.use('/users', usersController);

const sessionController = require('./controllers/session.js');
app.use('/session', sessionController);



// CONNECTIONS
//=====================

  app.listen(process.env.PORT, () => {
    console.log(`listening... ${process.env.PORT}`);
  })


mongoose.connect(process.env.DATABASE_URL, dbupdateobject);

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', process.env.DATABASE_URL ));
db.on('disconnected', () => console.log('mongo disconnected'));
db.on('open', () => {
  console.log('Connection made!');
});
