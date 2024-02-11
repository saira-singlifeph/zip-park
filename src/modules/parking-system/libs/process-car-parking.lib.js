const ParkingAreaModel = require('../models/parking-area.model');
const ParkingDetailsModel = require('../models/parking-details.model');
const generateReferenceNumber = require('../../../services/utils/generate-reference-num.util');
const logger = require('../../../services/utils/logger.utils');

const processParking = async ({ vehicleType }) => {
  logger.info(`processParking start - ${vehicleType}`);
  try {
    const availableParking = await ParkingAreaModel.getAvailableSlot();
    logger.info(`processParking fetched available slot - ${JSON.stringify(availableParking)}`);

    if (!availableParking) {
      // return 0 if no available parking slots now
      return {
        floor: 0,
        parkingSlot: 0,
        referenceNo: 0,
      };
    }

    // update parking areas available and occupied counts
    // eslint-disable-next-line no-underscore-dangle
    const parkingId = availableParking._id.toString();

    const updateParkingCount = await ParkingAreaModel
      .updateParkingArea(parkingId, {
        occupied: (availableParking.occupied + 1),
        vacant: (availableParking.vacant - 1),
      });
    logger.info(`processParking update parking info - ${JSON.stringify(updateParkingCount)}`);

    const refNo = generateReferenceNumber();

    const newParking = await ParkingDetailsModel.insertParkingRecord({
      vehicleType,
      parkingLevel: availableParking.level,
      parkingReferenceNo: refNo,
    });

    logger.info(`processParking added new parking details - ${JSON.stringify(newParking)}`);
    return {
      floor: availableParking.level,
      referenceNo: refNo,
    };
  } catch (error) {
    logger.error(`processParking response - ${JSON.stringify(error.message)}`);
    return {
      floor: 0,
      parkingSlot: 0,
      message: error.message,
    };
  }
};

module.exports = processParking;
