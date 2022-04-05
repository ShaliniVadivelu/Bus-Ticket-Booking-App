const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 30
    },
    email: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      ref: 'data'
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      maxlength: 50
    },
    phone: {
      type: Number,
      max: 9999999999,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    date: { 
      type: Date,
      default: Date.now       
    },
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Booking'
      }
    ]
  }
);

module.exports = mongoose.model("User", userSchema);