const ParkingAreaModel = require('../models/parking-area.model');
const logger = require('../../../services/utils/logger.utils');

const createParkingArea = async (payload) => {
  logger.info(`createParkingArea start - ${JSON.stringify(payload)}`);

  try {
    const { parkingAreas } = payload;
    const response = await ParkingAreaModel.insertManyParkingArea([...parkingAreas]);

    return {
      status: 200,
      message: response,
    };
  } catch (error) {
    logger.error(`createParkingArea error - ${JSON.stringify(error.message)}`);
    return {
      status: 500,
      message: error.message,
    };
  }
};

module.exports = createParkingArea;
