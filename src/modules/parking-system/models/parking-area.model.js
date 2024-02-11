const ParkingAreaModel = require('../schema/parking-area.schema');

const insertParkingArea = async (data) => {
  const response = await ParkingAreaModel.create({
    level: data.level,
    vacant: data.vacant,
    occupied: data.occupied,
    pwdSlots: data.pwdSlots,
  });

  return response;
};

const insertManyParkingArea = async (data) => {
  const response = await ParkingAreaModel.insertMany(data);
  return response;
};

const getAvailableSlot = async () => {
  const response = ParkingAreaModel
    .findOne({ vacant: { $ne: 0 } })
    .sort({ level: 'asc' });
  return response;
};

const updateParkingArea = async (id, values) => {
  const response = await ParkingAreaModel.findOneAndUpdate({ _id: id }, {
    ...values,
  });

  return response;
};

const getParkingAreaByLevel = async (id) => {
  const response = await ParkingAreaModel.findOne({ level: id });
  return response;
};

module.exports = {
  updateParkingArea,
  insertParkingArea,
  insertManyParkingArea,
  getAvailableSlot,
  getParkingAreaByLevel,
};
