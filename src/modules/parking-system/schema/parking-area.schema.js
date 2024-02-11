const mongoose = require('mongoose');

const ParkingAreaSchema = mongoose.Schema(
  {
    level: {
      type: Number,
      require: true,
    },
    available: {
      type: Number,
      require: true,
    },
    vacant: {
      type: Number,
      require: true,
    },
    occupied: {
      type: Number,
      require: true,
    },
    pwdSlots: {
      type: Array,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

const ParkingArea = mongoose.model('ParkingArea', ParkingAreaSchema);
module.exports = ParkingArea;
