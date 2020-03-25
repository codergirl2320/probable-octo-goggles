
const express = require('express');

const mongoose = require('mongoose');
const session = require('express-session');


const app = express();
require('dotenv').config();



app.get('/', (req,res) => {
  res.render('home.ejs')
})

//  mongoose.connection.once('open', () => {
//     console.log('connected to mongo');
// })
app.listen(process.env.PORT, () => {
    console.log(`listening... ${process.env.PORT}`);
})

const db = mongoose.connect(
  'mongodb://localhost:27017/trippr',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
mongoose.connect(process.env.DATABASE_URL, dbupdatedobject);

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', process.env.DATABASE_URL ));
db.on('disconnected', () => console.log('mongo disconnected'));
db.on('open', () => {
  console.log('Connection made!');


app.listen(process.env.PORT, () => {
    console.log('listening on port 3000');

});
