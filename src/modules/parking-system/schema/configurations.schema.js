const mongoose = require('mongoose');

const ConfigurationsSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      require: true,
    },
    vehicleType: {
      type: String,
      require: true,
    },
    flatRate: {
      type: Number,
      require: true,
    },
    flatHour: {
      type: Number,
      require: true,
    },
    succedingRate: {
      type: Number,
      require: true,
    },
    succedingHour: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

const Configurations = mongoose.model('Configurations', ConfigurationsSchema);
module.exports = Configurations;
