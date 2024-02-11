const mongoose = require('mongoose');

const ParkingSlotsSchema = mongoose.Schema(
  {
    level: {
      type: Number,
      require: true,
    },
    available: {
      type: Number,
      require: true,
    },
    used: {
      type: Number,
      require: true,
    },
  },
);

const ParkingSlots = mongoose.model('ParkingSlots', ParkingSlotsSchema);
module.exports = ParkingSlots;
