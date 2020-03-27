const express = require('express');
const router = express.Router();
const Trips = require('../models/trips.js');

router.get('/', (req, res) => {
    Trips.find({}, (error, foundTrips) => {
        res.json(foundTrips);
    })
})


router.post('/', (req, res) => {
    Trips.create(req.body, (err, createdTrip) => {
        res.json(createdTrip);
    });
});

router.delete('/:id', (req, res) => {
    Trips.findByIdAndRemove(req.params.id, (error, deletedTrip) => {
        res.json(deletedTrip);
    });
});

router.put('/:id', (req, res) => {
    Trips.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedTrip) => {
        res.json(updatedTrip);
    })
})

module.exports = router;
