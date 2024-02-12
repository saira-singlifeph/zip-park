const BuildingAccessModel = require('../schema/building-access.schema');

const insertBuildingAcess = async (payload) => {
  const response = await BuildingAccessModel.create({
    accessType: payload.accessType,
    accessName: payload.accessName,
    located: payload.located,
  });

  return response;
};

module.exports = {
  insertBuildingAcess,
};
