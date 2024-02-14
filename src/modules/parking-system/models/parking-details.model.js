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

const getParkingDetails = async (referenceNo = null) => {
  if (referenceNo) {
    const response = await ParkingDetailsModel.findOne({ _id: referenceNo });
    return response;
  }

  const response = ParkingDetailsModel
    .find()
    .where('isPaid')
    .in(false)
    .sort({ level: 'desc' });
  return response;
};

module.exports = {
  insertParkingRecord,
  updateParkingRecord,
  getParkingDetails,
};
