const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const auth = require('../../middleware/auth');
const Owner = require('../../models/Owner');
const Bus = require('../../models/Bus');
const {ROLE} = require('../../config/data');

// @route     POST api/bus
// @desc      Creating new bus and its details
// @access    Private

router.post('/',[auth,
    [
    check('companyName', 'Company name is required').not().isEmpty(),
    check('busType', 'Please include the bus type').not().isEmpty(),
    check('busNumber', 'Please include the bus number').not().isEmpty().isNumeric(),
    check('startCity', 'Please include the start city').not().isEmpty(),
    check('destination', 'Please include the destination city').not().isEmpty(),
    check('totalSeats', 'please include the total no.of seats').not().isEmpty().isNumeric()
    ]
], 
 async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }

    const{
        companyName,
        busType,
        busNumber,
        startCity,
        destination,
        totalSeats,
        availableSeats,
        pricePerSeat,
        departureDate,
        departureTime,
        duration
    }=req.body;

    // Build profile object
    const busFields = {};
    
    busFields.user =  req.user.id;
    if(companyName) busFields.companyName =  companyName;
    if(busType) busFields.busType =  busType;
    if(busNumber) busFields.busNumber =  busNumber;
    if(startCity) busFields.startCity =  startCity;
    if(destination) busFields.destination =  destination;
    if(totalSeats) busFields.totalSeats =totalSeats;
    
        let bus = await Bus.findOne({busNumber});

        if(bus)
        {
            return res.status(400).json({errors:[{msg: 'Bus already exist'}]});
        }
        
        try {
            
        let bus = await Bus.findOne({user: req.user.id});
        
        if(bus) {
            // Update   
            bus = await Bus.findOneAndUpdate(
                { user: req.user.id}, 
                {$set: busFields},
                {new: true}
            );

            return res.json (bus);
        }

        //Create    
        bus = new Bus(busFields);

        await bus.save();
        res.json(bus);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;