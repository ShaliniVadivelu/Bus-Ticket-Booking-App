const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BusSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'owner'
    },
    busType: {
        type: String,
        enum: ["AC", "Delux", "Normal", "Suspense AC", "Suspense Delux"]
    },
    busNumber: {
        type: Number,
        required: true,
        maxlength: 32
    },
    startCity: {
        type: String,
        required: true,
        enum: ["Chennai", "Bangalore", "Coimbatore", "Cochin", "Mumbai"]
    },
    destination: {
        type: String,
        required: true,
        enum: ["Chennai", "Bangalore", "Coimbatore", "Cochin", "Mumbai"]
    },
    totalSeats: {
        type: Number,
        default: 30,
        maxlength: 60
    },
    availableSeats: {
        type: Number,
        default: 0,
        maxlength: 60
    },
    pricePerSeat: {
        type: String
    },
    departureDate: {
        type: Date
    },
    departureTime: {
        type: String,
        maxlength: 32
    },
    duration: {
        type: String,
        maxlength: 32
    }
});

module.exports  = mongoose.model("Bus", BusSchema);