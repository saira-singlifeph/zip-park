const mongoose = require('mongoose');

const ParkingDetailsSchema = mongoose.Schema(
  {
    startTime: {
      type: Date,
      require: true,
      default: Date.now(),
    },
    endTime: {
      type: Date,
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
    parkingSlot: {
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
      default: 'GCash',
    },
  },
  {
    timestamps: true,
  },
);

const ParkingDetails = mongoose.model('ParkingDetails', ParkingDetailsSchema);
module.exports = ParkingDetails;
