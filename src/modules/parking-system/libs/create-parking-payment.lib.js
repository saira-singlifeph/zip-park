const moment = require('moment');
const ParkingDetailsModel = require('../schema/parking-details.schema');
const ConfigurationsModel = require('../schema/configurations.schema');

// const createSource = require('../../magpie/create-source.payment');
const { PAYMENT_TYPES } = require('../configurations');
const logger = require('../../../services/utils/logger.utils');

const { CASH, CASHLESS } = PAYMENT_TYPES;

const createParkingPayment = async (payload) => {
  logger.info(`createParkingPayment start - ${JSON.stringify(payload)}`);
  try {
    const { referenceNo, paymentType = CASH } = payload;
    const {
      vehicleType,
      startTime,
    } = await ParkingDetailsModel.findById({ _id: referenceNo });

    // compute parked hours
    const parkedHours = moment().diff(new Date(startTime), 'hours');
    // get the pricing configurations
    const configurations = await ConfigurationsModel.findById({ _id: vehicleType.toLowerCase() });

    let amountToPay = configurations.flatRate;
    let paymentMode = paymentType;

    // const payment = await createSource();

    // validate if parked hours exceeds
    if (parkedHours >= configurations.flatHour) {
      const succedingAmount = (parkedHours - configurations.flatHour)
        * configurations.succedingRate;

      amountToPay += succedingAmount;
      paymentMode = CASHLESS.GCASH;
    }

    const createdParkingPayment = {
      paymentMode,
      amountToPay,
      referenceNo,
      parkedHours: parkedHours || 1,
      // TO DO: Cashless payment
      vehicleDescription: configurations.vehicleType,
    };
    logger.info(`createParkingPayment response - ${JSON.stringify(createdParkingPayment)}`);
    return { ...createdParkingPayment };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

module.exports = createParkingPayment;
