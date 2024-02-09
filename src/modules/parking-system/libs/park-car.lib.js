const ParkingSlots = require('../models/parking-slot.model');
const ParkingDetails = require('../models/park-details.model');

const generateReferenceNumber = require('../../../services/utils/generate-reference-num.util');

const parkCarController = async ({ vehicleType }) => {
  try {
    const slots = await ParkingSlots.find();

    for (let level = 0; slots.length > level; level += 1) {
      const { available, used = 1, _id } = slots[level];

      if (available) {
        const usedSlots = (used + 1);
        const floorLevel = (level + 1);

        // update the available and used values
        const idString = _id.toString();

        /* eslint-disable no-await-in-loop */
        await ParkingSlots.findOneAndUpdate({ _id: idString }, {
          available: (available - 1),
          used: usedSlots,
        });

        const refNo = generateReferenceNumber();
        const parkingSlot = `F-${floorLevel} ${usedSlots}`;

        /* eslint-disable no-await-in-loop */
        const newParkingRecord = new ParkingDetails({
          vehicleType,
          parkingReferenceNo: refNo,
          parkingSlot,
        });

        await newParkingRecord.save();

        return {
          floor: floorLevel,
          parkingSlot,
          referenceNo: refNo,
        };
      }
    }

    return {
      floor: 0,
      parkingSlot: 0,
    };
  } catch (error) {
    return {
      floor: 0,
      parkingSlot: 0,
      message: error.message,
    };
  }
};

module.exports = parkCarController;
