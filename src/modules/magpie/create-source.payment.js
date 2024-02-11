const axios = require('axios');

const createSource = async () => {
  try {
    const request = {
      url: 'https://developer.magpie.im/v2/sources/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from('espinosairabunny@gmail.com:&3?=Ks$kwA4##wU').toString('base64')}`,
      },
      body: JSON.stringify({
        currency: 'php',
        type: 'gcash',
        redirect: {
          success: 'https://magpie.im/?status=success',
          fail: 'https://magpie.im/?status=failed',
        },
      }),
    };
    const response = await axios(request);

    return response.data;
  } catch (error) {
    return error.message;
  }
};

module.exports = createSource;
