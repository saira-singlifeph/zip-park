const ParkingDetailsModel = require('../models/parking-details.model');
const parkingComputation = require('./parking-computation.lib');
const { PAYMENT_TYPES } = require('../configurations');
const logger = require('../../../services/utils/logger.utils');

const createParkingPayment = async (payload) => {
  logger.info(`createParkingPayment start - ${JSON.stringify(payload)}`);
  try {
    const { referenceNo } = payload;
    const {
      vehicleType,
      startTime,
    } = await ParkingDetailsModel.getParkingDetails(referenceNo);

    const computed = await parkingComputation(startTime, vehicleType);

    const createdParkingPayment = {
      paymentMode: PAYMENT_TYPES.CASH,
      amountToPay: computed.amountToPay,
      referenceNo,
      parkedHours: computed.parkedHours || 1,
      // TO DO: Cashless payment
      vehicleDescription: vehicleType,
    };
    logger.info(`createParkingPayment response - ${JSON.stringify(createdParkingPayment)}`);
    return {
      status: 200,
      message: { ...createdParkingPayment },
    };
  } catch (error) {
    logger.error(`createParkingPayment error - ${JSON.stringify(error.message)}`);
    return {
      status: 500,
      message: error.message,
    };
  }
};

module.exports = createParkingPayment;
