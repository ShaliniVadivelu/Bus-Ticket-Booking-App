const express = require('express');
const router = express.Router();
const {check, validationResult} = require ('express-validator');

const Bus = require('../../models/Bus');

router.get ('/searchBus', [
    check('startCity', 'StartCity is required').not().isEmpty(),
    check('destination', 'Destination is required').not().isEmpty(),
    check('departureDate', "Departure date is required").not().isEmpty()
    
], async (req, res)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        // $and is to combine both fields for filtering
    const bus = await Bus.find({
        $and: [
            {
                $and: [
                    {startCity: req.body.startCity}, 
                    {destination: req.body.destination}
                ]
            },
                {departureDate: req.body.departureDate}
            ]
    });

    if(!bus)
    {
        console.log('Bus not found');
        return res.status(400).json({msg :'Bus not found'});
    }
    res.json(bus);

    } catch(err) {
        console.error (err.message);
        res.status(500).send ('Server error');
    }
});

module.exports = router;