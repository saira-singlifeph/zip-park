const router = require('express').Router();

// libs
const processParking = require('./libs/process-car-parking.lib');
const createParkingPayment = require('./libs/create-parking-payment.lib');
const processParkingPayment = require('./libs/process-parking-payment.lib');
const createParkingArea = require('./libs/create-parking-area.lib');
const getParkingDetails = require('./libs/get-parking-details.lib');
const createParkingAccess = require('./libs/parking-access.lib');

router.get('/details/:referenceNumber?', async (req, res) => {
  const refNo = req.query ? req.query.referenceNumber : null;
  const response = await getParkingDetails(refNo);
  return res.send({ status: response.status, data: response.data });
});

/**
 * @swagger
 * /api/v1/process:
 *   post:
 *     description: provides floor level, slot number and a unique reference number
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vehicleType
 *             properties:
 *               vehicleType:
 *                 type: string
 *                 enum: [2W, 4W]
 *     responses:
 *       200:
 *         description: success
 */
router.post('/process', async (req, res) => {
  const response = await processParking(req.body);
  return res.send({ status: 200, data: response });
});

/**
 * @swagger
 * /api/v1/car-parking/create-payment:
 *   post:
 *     description: create payment details such as payment amount, parked hours, and payment gateway
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - referenceNo
 *               - paymentType
 *             properties:
 *               referenceNo:
 *                 type: string
 *               paymentType:
 *                 type: string
 *                 enum: [Cash, GCash]
 *     responses:
 *       200:
 *         description: success
 */
router.post('/create-payment', async (req, res) => {
  const response = await createParkingPayment(req.body);
  return res.send({ status: 200, data: response });
});

/**
 * @swagger
 * /api/v1/car-parking/process-payment:
 *   post:
 *     description: process created payment and update necessary tables
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paymentMode
 *               - amountToPay
 *               - referenceNo
 *               - parkedHours
 *             properties:
 *               paymentMode:
 *                 type: string
 *                 enum: [Cash, GCash]
 *               referenceNo:
 *                 type: string
 *                 require: true
 *               parkedHours:
 *                  type: number
 *                  require: true
 *     responses:
 *       200:
 *         description: success
 */
router.post('/process-payment', async (req, res) => {
  const response = await processParkingPayment(req.body);
  return res.send({ status: 200, data: response });
});

router.post('/create-parking-area', async (req, res) => {
  const response = await createParkingArea(req.body);
  res.send({ status: response.status, data: response.message });
});

router.post('/create-access', async (req, res) => {
  const response = await createParkingAccess(req.body);
  res.send({ status: response.status, data: response.message });
});

module.exports = router;
