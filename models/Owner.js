const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ownerSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      maxlength: 32
    },
    officeAddress: {
      type: String,
      required: true,
      maxlength: 64
    },
    phone: {
      type: Number,
      max: 9999999999,
      required: true
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true
    },
    buses: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Bus'
          }
      ]
  },
);

module.exports = mongoose.model("Owner", ownerSchema);