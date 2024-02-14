const mongoose = require('mongoose');
const ConfigurationsModel = require('../schema/configurations.schema');

require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL;
mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const insertConfiguration = async (payload) => {
  const response = await ConfigurationsModel.create(
    {
      _id: payload.vehicleType,
      vehicleType: payload.vehicleType,
      flatRate: payload.flatRate,
      flatHour: payload.flatHour,
      succedingRate: payload.succedingRate,
      succedingHour: payload.succedingHour,
    },
  );

  return response;
};

const insertConfigurations = async (configurations) => {
  const response = await ConfigurationsModel.insertMany(configurations);
  return response;
};

module.exports = {
  insertConfiguration,
  insertConfigurations,
};
