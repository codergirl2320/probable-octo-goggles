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

app.put('/trippr/:id', (req,res) =>{

    Trip.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedModel) => {
    res.redirect('/trippr');

    })
})

app.get('/trippr',(req,res)=>{
  res.send('/trippr')
})

app.get('/trippr/:id/edit', (req,res)=>{
    Trip.findById(req.params.id, (error, foundTrip) =>{
    res.render(
        'edit.ejs',
        {
            trip: foundTrip,
            img: req.body.img
        }
        )

    })
})

app.delete('/trippr/:id', (req,res) =>{
    Trip.findByIdAndRemove(req.params.id, (error, data) =>{
        res.redirect('/trippr');
    })

})

app.get('/trippr/new', (req, res) => {
    res.render('new.ejs')
});

app.get('/trippr/:id', (req, res) => {
    Trip.findById(req.params.id, (error, foundTrip) => {
        res.render(
            'show.ejs',
            {
                trip:foundTrip
            }
        )
    })
});

app.get('/trippr', (req, res) => {
    Trip.find({}, (error, allTrips) => {

        res.render(
            'index.ejs',
            {
                trips:allTrips
            }
        );
    })
});

app.post('/trippr/', (req, res) => {
    Trip.create(req.body, (error, createdTrip) => {
        res.redirect('/trippr');
    })
});
