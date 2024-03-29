const mongoose = require('mongoose');

const ParkingDetailsSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      require: true,
    },
    startTime: {
      type: Date,
      require: true,
      default: Date.now(),
    },
    parkedHours: {
      type: Number,
    },
    vehicleType: {
      type: String,
      enum: ['2W', '4W'],
      require: true,
    },
    isPaid: {
      type: Boolean,
      require: true,
      default: false,
    },
    amountToPay: {
      type: Number,
      require: true,
      default: 0,
    },
    parkingReferenceNo: {
      type: String,
      require: true,
    },
    paymentReferenceNo: {
      type: String,
      default: null,
    },
    paymentType: {
      type: String,
      enum: ['GCash', 'Cash'],
      default: 'Cash',
    },
    parkingLevel: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

const ParkingDetails = mongoose.model('ParkingDetails', ParkingDetailsSchema);
module.exports = ParkingDetails;
