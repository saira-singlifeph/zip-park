const BuildingAccessModel = require('../models/building-access.schema');
const ParkingAreaModel = require('../models/parking-area.model');
const logger = require('../../../services/utils/logger.utils');

const createParkingAccess = async (payload) => {
  logger.info(`createParkingEntrance start - ${JSON.stringify(payload)}`);
  try {
    // check if the level located exists
    const levelLocation = await ParkingAreaModel.getParkingAreaByLevel(payload.located);

    if (!levelLocation) {
      return {
        status: 500,
        message: 'level location does not exists',
      };
    }

    const newParkingAccess = await BuildingAccessModel.insertBuildingAcess(payload);
    logger.info(`createParkingAccess success - ${JSON.stringify(newParkingAccess)}`);
    return {
      status: 200,
      message: 'success',
    };
  } catch (error) {
    logger.error(`createParkingAccess error - ${JSON.stringify(error.message)}`);
    return {
      status: 500,
      message: error.message,
    };
  }
};

module.exports = createParkingAccess;
