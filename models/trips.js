const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    image: String,
    title: String,
    story: String,
    like: {type: Number, min:0}
});

const Trips = mongoose.model('Trip', tripSchema);

module.exports = Trips;
