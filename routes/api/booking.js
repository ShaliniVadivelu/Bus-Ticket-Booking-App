const express = require('express');
const router = express.Router();
const {check, validationResult} = require ('express-validator');

const Bus = require('../../models/Bus');
const auth = require('../../middleware/auth');

// @route     GET api/booking/searchBus
// @desc      search the bus with 3 fields
// @access    Public

router.get ('/searchBus', [auth.authBasic,
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

// // @route     POST api/bus/BookTicket
// // @desc      Booking a ticket
// // @access    Private

// router.post ('/bus/:bus_id/bookTicket',[auth.authBasic,
//     check('numPassengers', 'Please enter no.of passengers').not().isEmpty().isNumeric(),
//     check("seatNumber", "Please select the seat").not().isEmpty()
// ],async (req,res) => {

//     const errors= validationResult(req);
//     if (!errors.isEmpty())
//     {
//         return res.status(400).json({errors: errors.array });
//     }
    
//     const { numPassengers, seatNumber} = req.body;

//     const ticketFields = {};
//     ticketFields.user = req.user.id;
//     ticketFields.bus =  req.bus.id;
//     if(numPassengers) ticketFields.numPassengers =numPassengers;
//     if(seatNumber) {
//         ticketFields.seatNumber =  seatNumber.split(',').map(seatNumber => seatNumber.trim());
//     }
//     try {
//         let bookTicket = await Bus.findOne({ bus: req.bus.id });

//         bookTicket = new Profile(ticketFields);

//         await bookTicket.save();
//         res.json(bookTicket);

//     }catch (err)
//     {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

module.exports = router;