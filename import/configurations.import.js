const mongoose = require('mongoose');
const ConfigurationsModel = require('../src/modules/parking-system/models/configurations.model');
const logger = require('../src/services/utils/logger.utils');

require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL;
mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const importData = async () => {
  try {
    const fetched = await ConfigurationsModel.fetchConfigurations({ _id: '2W' });
    logger.log(`importData - fetched ${JSON.stringify(fetched)}`);
    return fetched;
  } catch (error) {
    logger.error(`importing error - ${error.message}`);
    throw error(error.message);
  }
};

importData();
