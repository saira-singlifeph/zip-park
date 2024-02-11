const moment = require('moment');
const ParkingAreaModel = require('../models/parking-area.model');
const ParkingDetailsModel = require('../models/parking-details.model');
const { PAYMENT_TYPES } = require('../configurations');
const logger = require('../../../services/utils/logger.utils');

const processParkPayment = async (payload) => {
  logger.info(`processParkPayment start - ${JSON.stringify(payload)}`);
  try {
    const {
      paymentMode, amountToPay, referenceNo, parkedHours,
    } = payload;

    if (paymentMode === PAYMENT_TYPES.CASHLESS.GCASH) {
      return {
        status: 200,
        message: 'TO BE INTEGRATED',
      };
    }

    const currentDate = moment().format('YYMMDDHHMMSS');
    const paymentRef = `${currentDate}-${referenceNo}`;

    // store the payment details
    const updatedParkingDetails = await ParkingDetailsModel.updateParkingRecord(referenceNo, {
      parkedHours,
      amountToPay,
      isPaid: true,
      paymentType: paymentMode,
      paymentReferenceNo: paymentRef,
    });

    logger.info(`processParkPayment updated parkingDetails - ${JSON.stringify(updatedParkingDetails)}`);

    const parkingArea = await ParkingAreaModel
      .getParkingAreaByLevel(updatedParkingDetails.parkingLevel);

    // eslint-disable-next-line no-underscore-dangle
    const id = parkingArea._id.toString();
    const updatedParkingArea = await ParkingAreaModel.updateParkingArea(id, {
      vacant: (parkingArea.vacant + 1),
      occupied: (parkingArea.occupied - 1),
    });
    logger.info(`processParkPayment updated updatedParkingArea - ${JSON.stringify(updatedParkingArea)}`);

    logger.info(`processParkPayment success - ${JSON.stringify(updatedParkingDetails)}`);
    return {
      status: 200,
      message: 'Paid',
    };
  } catch (error) {
    logger.error(`processParkPayment error - ${JSON.stringify(error.message)}`);
    return {
      status: 500,
      message: error.message,
    };
  }
};

module.exports = processParkPayment;
