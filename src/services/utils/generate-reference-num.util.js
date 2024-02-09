const moment = require('moment');

const generateReferenceNumber = () => {
  const timeStamp = moment().format('YYMMDDHHMMSS');
  const randomNum = Math.floor(Math.random() * 100);

  const uniqueNumber = `${timeStamp}${randomNum}`;
  return uniqueNumber;
};

module.exports = generateReferenceNumber;
