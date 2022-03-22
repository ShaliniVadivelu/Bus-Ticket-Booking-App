const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const Owner = require('../../models/Owner');
const Bus = require('../../models/Bus');

// @route     POST api/bus
// @desc      Creating new bus and its details
// @access    Private

router.post('/',[auth,
    [
    check('owner', 'Owner is required').not().isEmpty(),
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
        owner,
        busType,
        busNumber,
        startCity,
        destination,
        availableSeats,
        pricePerSeat,
        departureDate,
        departureTime,
        duration
    }=req.body;

    try {
        let bus = await Bus.findOne({busNumber});

        if(bus)
        {
            return res.status(400).json({errors:[{msg: 'Bus already exist'}]});
        }
        res.send('Bus route');
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;