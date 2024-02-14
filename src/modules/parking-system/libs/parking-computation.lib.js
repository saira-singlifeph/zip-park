const moment = require('moment');
const ConfigurationsModel = require('../models/configurations.model');
const logger = require('../../../services/utils/logger.utils');

const parkingComputation = async (startTime, vehicleType) => {
  logger.info(`parkingComputation 
        startTime ${JSON.stringify(startTime)}
        vehicleType ${JSON.stringify(vehicleType)}
        `);

  // compute parked hours
  const parkedHours = moment().diff(new Date(startTime), 'hours');
  // get the pricing configurations
  const configurations = await ConfigurationsModel.getsConfigurations(vehicleType);

  let amountToPay = configurations.flatRate;
  // const payment = await createSource();

  // validate if parked hours exceeds
  if (parkedHours >= configurations.flatHour) {
    const succedingAmount = (parkedHours - configurations.flatHour)
        * configurations.succedingRate;

    amountToPay += succedingAmount;
  }

  return {
    amountToPay,
    parkedHours,
  };
};

module.exports = parkingComputation;
