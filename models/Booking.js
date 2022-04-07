const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    bus: {
      type: Schema.Types.ObjectId,
      ref: 'Bus'
    },
    numPassengers: {
      type: Number,
      default: 1,
      required: true
    },
    totalPrice: {
      type: String
    },
    bookingStatus: {
      type: String,
      enum: ["BOOKED", "CANCELLED"]
    },
    createdTime: {
      type: Date,
      default: Date.now
    }
});

module.exports = mongoose.model("Booking", bookingSchema);