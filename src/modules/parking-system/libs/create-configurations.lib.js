const ConfigurationsModel = require('../models/configurations.model');
const logger = require('../../../services/utils/logger.utils');

const createConfigurations = async (payload) => {
  try {
    logger.info(`createConfigurations payload ${JSON.stringify(payload)}`);

    const insertedConfigs = await ConfigurationsModel.insertConfigurations(payload);
    logger.info(`createConfigurations added ${JSON.stringify(insertedConfigs)}`);
    return {
      status: 200,
      message: insertedConfigs,
    };
  } catch (error) {
    logger.error(`createConfigurations error - ${JSON.stringify(error.message)}`);
    return {
      status: 500,
      message: error.message,
    };
  }
};

module.exports = createConfigurations;
