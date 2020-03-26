const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    image: String,
    title: String,
    story: String
});

const Trips = mongoose.model('Trip', tripSchema);

module.exports = Trips;
