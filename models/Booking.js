const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    bus: {
      type: Schema.Types.ObjectId,
      ref: 'Bus'
    },
    totalPrice: {
      type: String
    },
    numPassengers: {
      type: Number,
      default: 1
    },
    bookingStatus: {
      type: String,
      enum: ["BOOKED", "CANCELLED"]
    },
    createdTime: {
      type: String
    }
});

module.exports = mongoose.model("Booking", bookingSchema);