// const ParkingSlots = require('../models/parking-slot.model');

// const removeCarController = async () => {
//   try {
//     const slots = await ParkingSlots.find();

//     for (let level = 0; slots.length > level; level++) {
//       const { available, used = 1, _id } = slots[level];

//       if (available) {
//         const usedSlots = (used + 1);
//         const floorLevel = (level + 1);

//         // update the available and used values
//         const idString = _id.toString();
//         await ParkingSlots.findOneAndUpdate({ _id: idString }, {
//           available: available - 1,
//           used: usedSlots,
//         });

//         return {
//           floor: floorLevel,
//           parkingSlot: `F-${floorLevel} ${usedSlots}`,
//         };
//       }
//     }

//     return {
//       floor: 0,
//       parkingSlot: 0,
//     };
//   } catch (error) {
//     return {
//       floor: 0,
//       parkingSlot: 0,
//       message: error.message,
//     };
//   }
// };

// module.exports = removeCarController;
