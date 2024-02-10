const router = require('express').Router();

// libs
const processParking = require('./libs/process-car-parking.lib');
const createParkingPayment = require('./libs/create-parking-payment.lib');
const processParkingPayment = require('./libs/process-parking-payment.lib');

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

module.exports = router;
