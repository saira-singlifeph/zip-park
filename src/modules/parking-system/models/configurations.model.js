const ConfigurationsModel = require('../schema/configurations.schema');

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

const fetchConfigurations = async (where) => {
  const response = await ConfigurationsModel.find({ ...where });
  return response;
};

module.exports = {
  insertConfiguration,
  insertConfigurations,
  fetchConfigurations,
};
