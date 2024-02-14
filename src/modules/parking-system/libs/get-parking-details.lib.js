const ParkingDetailsModel = require('../models/parking-details.model');
const parkingComputation = require('./parking-computation.lib');
const logger = require('../../../services/utils/logger.utils');

const getParkingDetails = async (referenceNo = null) => {
  logger.info(`getParkingDetails start - payload ${JSON.stringify(referenceNo)}`);
  try {
    const fetchedParkingDetails = await ParkingDetailsModel.getParkingDetails({ referenceNo });

    if (referenceNo) {
      const runningBill = await parkingComputation(
        fetchedParkingDetails.startTime,
        fetchedParkingDetails.vehicleType,
      );

      const parking = {
        startTime: fetchedParkingDetails.startTime,
        vehicleType: fetchedParkingDetails.vehicleType,
        isPaid: fetchedParkingDetails.isPaid,
        parkingReferenceNo: fetchedParkingDetails.parkingReferenceNo,
        paymentReferenceNo: fetchedParkingDetails.parkingReferenceNo,
        paymentType: fetchedParkingDetails.paymentType,
        parkingLevel: fetchedParkingDetails.parkingLevel,
        createdAt: fetchedParkingDetails.createdAt,
        amountToPay: runningBill.amountToPay,
      };
      logger.info(`fetchedParkingDetails success ${JSON.stringify(parking)}`);

      return {
        status: 200,
        data: parking,
      };
    }

    const parkingsDetails = [];
    for (let x = 0; fetchedParkingDetails.length > x; x += 1) {
      const parking = fetchedParkingDetails[x];
      // eslint-disable-next-line no-await-in-loop
      const runningBill = await parkingComputation(
        parking.startTime,
        parking.vehicleType,
      );

      parkingsDetails.push({
        startTime: parking.startTime,
        vehicleType: parking.vehicleType,
        isPaid: parking.isPaid,
        parkingReferenceNo: parking.parkingReferenceNo,
        paymentReferenceNo: parking.parkingReferenceNo,
        paymentType: parking.paymentType,
        parkingLevel: parking.parkingLevel,
        createdAt: parking.createdAt,
        amountToPay: runningBill.amountToPay,
      });
    }

    logger.info(`getParkingDetails start - success ${JSON.stringify(parkingsDetails)}`);
    return {
      status: 200,
      data: parkingsDetails,
    };
  } catch (error) {
    logger.error(`getParkingDetails error - payload ${JSON.stringify(error.message)}`);
    return {
      status: 500,
      message: error.message,
    };
  }
};

module.exports = getParkingDetails;
