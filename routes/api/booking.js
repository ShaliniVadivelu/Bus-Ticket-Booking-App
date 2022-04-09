const express = require('express');
const router = express.Router();
const {check, validationResult} = require ('express-validator');

const Bus = require('../../models/Bus');
const Booking = require('../../models/Booking');
const auth = require('../../middleware/auth');

// @route     POST api/bus/BookTicket
// @desc      Booking a ticket
// @access    Private

router.post ('/:bus_id/bookTicket',[auth.authBasic,
    [
    check('numPassengers', 'Please enter no.of passengers').not().isEmpty().isNumeric(),
    ]
],async (req,res) => {

    const errors= validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({errors: errors });
    }

    const {numPassengers} = req.body;
    
    let bookBus = await Bus.findById(req.params.bus_id).select('busNumber startCity destination pricePerSeat availableSeats');

    if(numPassengers > bookBus.availableSeats)
    {
        return res.status(401).json({msg: 'given no.of seats are greater than available seats'});
    }
    
    const ticketFields = {};

    ticketFields.bus = bookBus;
    ticketFields.user = req.user.id;
    const msg = {};

    if (bookBus.busNumber) msg.busNumber=bookBus.busNumber; 
    if (bookBus.startCity) msg.startCity = bookBus.startCity;
    if (bookBus.destination) msg.destination = bookBus.destination;
    if (bookBus.startCity) msg.startCity = bookBus.startCity; 
    if (numPassengers) 
    {
        ticketFields.numPassengers = numPassengers;
    }
    if (bookBus.pricePerSeat) 
    {
        ticketFields.pricePerSeat = bookBus.pricePerSeat;  
    }
    ticketFields.totalPrice = numPassengers * bookBus.pricePerSeat;

    ticketFields.bookingStatus = 'BOOKED';
    
    try {

        ticket = new Booking(ticketFields);
        await ticket.save();
        res.json(ticket);

    } catch(err){
        console.error(err.message);
        return res.status(500).send('Server error');
    }
    
});

// @route     POST api/booking/viewAllTicket
// @desc      View all the user booked ticket details
// @access    Private

router.get('/viewAllTicket', auth.authOwner, async(req,res) => {

    try  {
        const tickets = await Booking.find();

        res.json(tickets);

    } catch (err) {
        console.error (err.message);

        res.status(500).send ('Server error');

    }
});

// @route     POST api/bus/viewTicket
// @desc      View the booked ticket details by the user
// @access    Private

router.get('/viewTicket', auth.authBasic, async(req,res) => {

    try  {
        const tickets = await Booking.find();
        res.json(tickets);

    } catch (err) {
        console.error (err.message);

        res.status(500).send ('Server error');

    }
});

module.exports = router;