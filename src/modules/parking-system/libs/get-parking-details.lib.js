const ParkingDetailsModel = require('../models/parking-details.model');
const logger = require('../../../services/utils/logger.utils');

const getParkingDetails = async (referenceNo = null) => {
  logger.info(`getParkingDetails start - payload ${JSON.stringify(referenceNo)}`);
  try {
    const fetchedParkingDetails = await ParkingDetailsModel.getParkingDetails(referenceNo);
    return {
      status: 200,
      data: fetchedParkingDetails,
    };
  } catch (error) {
    logger.info(`getParkingDetails error - payload ${JSON.stringify(error.message)}`);
    return {
      status: 500,
      message: error.message,
    };
  }
};

module.exports = getParkingDetails;
