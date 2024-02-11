const ParkingDetailsModel = require('../schema/parking-details.schema');

const insertParkingRecord = async (data) => {
  const response = await ParkingDetailsModel.create({
    _id: data.parkingReferenceNo,
    ...data,
  });
  return response;
};

const updateParkingRecord = async (id, data) => {
  const response = await ParkingDetailsModel.findOneAndUpdate({ _id: id }, {
    ...data,
  });

  return response;
};

module.exports = {
  insertParkingRecord,
  updateParkingRecord,
};
