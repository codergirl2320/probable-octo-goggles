
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const session = require('express-session');


require('dotenv').config();

app.use(express.static('public'));
app.use(express.json());
app.use(session({
    secret:"feedmeseymour",
    resave:false,
    saveUninitialized:false
}));



app.get('/', (req,res) => {
  res.send('I here I listen')
})

//  mongoose.connection.once('open', () => {
//     console.log('connected to mongo');
// })

const db = mongoose.connection;
  const dbupdateobject = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  };
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
