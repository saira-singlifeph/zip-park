const ParkingSlotsModel = require('../models/parking-slot.model');
const ParkingDetailsModel = require('../models/park-details.model');
const generateReferenceNumber = require('../../../services/utils/generate-reference-num.util');
const logger = require('../../../services/utils/logger.utils');

const processParking = async ({ vehicleType }) => {
  logger.info(`processParking start - ${vehicleType}`);
  try {
    const slots = await ParkingSlotsModel.find();

    for (let level = 0; slots.length > level; level += 1) {
      const { available, used = 1, _id } = slots[level];

      if (available) {
        const usedSlots = (used + 1);
        const floorLevel = (level + 1);

        // update the available and used values
        const idString = _id.toString();

        /* eslint-disable no-await-in-loop */
        await ParkingDetailsModel.findOneAndUpdate({ _id: idString }, {
          available: (available - 1),
          used: usedSlots,
        });

        const refNo = generateReferenceNumber();
        const parkingSlot = `F-${floorLevel} ${usedSlots}`;

        /* eslint-disable no-await-in-loop */
        const newParkingRecord = new ParkingDetailsModel({
          _id: refNo,
          vehicleType,
          parkingSlot: floorLevel,
          parkingReferenceNo: refNo,
        });

        logger.info(`processParking newParkingRecord - ${newParkingRecord}`);

        await newParkingRecord.save();

        const processedParking = {
          floor: floorLevel,
          parkingSlot,
          referenceNo: refNo,
        };

        logger.info(`processParking response - ${JSON.stringify(processedParking)}`);

        return { ...processedParking };
      }
    }

    // return 0 if no available parking slots now
    return {
      floor: 0,
      parkingSlot: 0,
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
