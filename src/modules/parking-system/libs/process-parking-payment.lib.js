const moment = require('moment');
const ParkingDetailsModel = require('../models/park-details.model');
const ParkingSlotsModel = require('../models/parking-slot.model');
const { PAYMENT_TYPES } = require('../constant');
const logger = require('../../../services/utils/logger.utils');

const processParkPayment = async (payload) => {
  logger.log(`processParkPayment start - ${JSON.stringify(payload)}`);
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
    const parkingDetails = await ParkingDetailsModel.findOneAndUpdate({ _id: referenceNo }, {
      parkedHours,
      amountToPay,
      isPaid: true,
      paymentType: paymentMode,
      paymentReferenceNo: paymentRef,
    });

    logger.log(`processParkPayment updated parkingDetails - ${JSON.stringify(parkingDetails)}`);

    const level = +parkingDetails.parkingSlot;
    // update the parking slosts
    const parkingSlotDetails = await ParkingSlotsModel.find({ level });
    const { available, used, _id } = parkingSlotDetails[0];

    const newUsedCount = (used - 1);
    const newAvailableCount = (available + 1);

    const id = _id.toString();
    await ParkingSlotsModel.findOneAndUpdate({ _id: id }, {
      used: newUsedCount,
      available: newAvailableCount,
    });

    logger.log(`processParkPayment success - ${JSON.stringify(parkingDetails)}`);
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
