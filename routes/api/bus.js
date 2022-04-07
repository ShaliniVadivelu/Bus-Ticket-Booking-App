const express = require('express');
const router = express.Router();
const {check, validationResult, checkSchema} = require('express-validator');

const auth= require('../../middleware/auth');
const Bus = require('../../models/Bus');
const Booking = require('../../models/Booking');

// @route     POST api/bus/createBus
// @desc      Creating new /edit bus
// @access    Private

router.put('/createBus',[auth.authOwner,
    [
    check('companyName', 'Company name is required').not().isEmpty(),
    check('busType', 'Bus type is required').not().isEmpty(),
    check('busNumber', 'Bus number is required').not().isEmpty().isNumeric(),
    check('startCity', 'Start city is required').not().isEmpty(),
    check('destination', 'Destination city is required').not().isEmpty(),
    check('totalSeats', 'Please include the total no.of seats').not().isEmpty().isNumeric(),
    check('availableSeats', 'Please include the available seats').not().isEmpty().isNumeric(),
    check('pricePerSeat', 'Please include the price of per seat').not().isEmpty().isNumeric(),
    check('departureDate','Departure date is required').not().isEmpty(),
    check('departureTime','Departure time is required').not().isEmpty(),
    check('duration','Duration is required').not().isEmpty()
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

    const busFields = {};

    busFields.owner =  req.owner.id;
    if(companyName) busFields.companyName =  companyName;
    if(busType) busFields.busType =  busType;
    if(busNumber) busFields.busNumber =  busNumber;
    if(startCity) busFields.startCity =  startCity;
    if(destination) busFields.destination =  destination;
    if(totalSeats) busFields.totalSeats =totalSeats;
    if(availableSeats) busFields.availableSeats =totalSeats;
    if(pricePerSeat) busFields.pricePerSeat =pricePerSeat;
    if(departureDate) busFields.departureDate =departureDate;
    if(departureTime) busFields.departureTime =departureTime;
    if(duration) busFields.duration =duration;

    let bus = await Bus.findOne({busNumber});

        if(bus)
        {
            let bus = await Bus.findOne({owner: req.owner.id});
        
                if(bus) {
                    bus = await Bus.findOneAndUpdate(
                    {owner: req.owner.id}, 
                    {$set: busFields},
                    {new: true}
                    );
                return res.json (bus);
            }
        }

    try {
        let newBus = new Bus(busFields);
        
        await newBus.save();

        res.json(newBus);

} catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});

// @route     GET api/bus
// @desc      Get all bus details
// @access    Public 

router.get ('/', async (req,res) => {
    try  {
        const buses = await Bus.find();

        res.json(buses);

    } catch (err) {
        console.error (err.message);

        res.status(500).send ('Server error');

    }
});

// @route     GET api/bus/owner/:owner_id
// @desc      Get all bus details for a paritcular owner using owner ID
// @access    Private

router.get ('/owner/:owner_id',auth.authOwner, async (req,res) => {
    try  {
        const bus = await Bus.find({ owner: req.params.owner_id });

        if(!bus) {
            return res.status(404).json({ msg: 'No BUS!'});
        }
        res.send(bus);

    } catch (err) {
        console.error (err.message);
        res.status(500).send ('Server error');
    }
});

// @route     GET api/bus/:id
// @desc      Get bus by bus ID
// @access    Public

router.get('/:id', async(req, res) => {
    try {
        const bus =  await Bus.findById(req.params.id);

        if(!bus) {
            return res.status(404).json({ msg: 'Bus not found'});
        }
        res.json(bus);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
}
});

// @route     DELETE api/bus/:id
// @desc      Delete bus by bus ID
// @access    Private

router.delete('/:id',auth.authOwner, async(req, res) => {
    try {
        const bus =  await Bus.findById(req.params.id);

        if(!bus) {
            return res.status(404).json({ msg: 'Bus not found'});
        }
        
        if(bus.owner.toString() !==req.owner.id) {
            return res.status(401).json({'msg' : 'Owner not authorised'});
        }

        await bus.remove();

        res.json({ msg: 'Bus got Deleted'});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
}
});

// @route     GET api/booking/searchBus
// @desc      search the bus with 3 fields
// @access    Public

router.get ('/booking/searchBus', [auth.authBasic,
    [
    check('startCity', 'StartCity is required').not().isEmpty(),
    check('destination', 'Destination is required').not().isEmpty(),
    check('departureDate', "Departure date is required").not().isEmpty()
    ]
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

    if(!bus) {
        return res.status(400).json({error: [{msg :'No bus found!'}]});
       }
    res.json(bus);
    
    } catch(err) {
        console.error (err.message);
        res.status(500).send ('Server error');
    }
});

module.exports = router;