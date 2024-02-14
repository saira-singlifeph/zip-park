const ParkingDetailsModel = require('../models/parking-details.model');
const ParkingAreaModel = require('../models/parking-area.model');
const logger = require('../../../services/utils/logger.utils');

const getParkingCounts = async () => {
  logger.info('getParkingCounts - start');
  try {
    const unpaidParkings = await ParkingDetailsModel.getParkingDetails({ paidStatus: true });
    const availabe = await ParkingAreaModel.getAvailableSlot(true);

    const totalVacant = availabe.reduce((sum, item) => sum + item.vacant, 0);
    const count = {
      occupied: unpaidParkings.length,
      availabe: totalVacant,
    };

    logger.info('getParkingCounts - success', count);
    return {
      status: 200,
      message: count,
    };
  } catch (error) {
    logger.error(`getParkingCounts - error ${JSON.stringify(error.message)}`);
    return {
      status: 500,
      message: error.message,
    };
  }
};

module.exports = getParkingCounts;
