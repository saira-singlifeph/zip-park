const mongoose = require('mongoose');

const BuildingAccessSchema = mongoose.Schema(
  {
    accessType: {
      type: String,
      enum: ['entrance', 'exit'],
      require: true,
    },
    accessName: {
      type: String,
      require: true,
    },
    located: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

const BuildingAccess = mongoose.model('BuildingAccess', BuildingAccessSchema);
module.exports = BuildingAccess;
