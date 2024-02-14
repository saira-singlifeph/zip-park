const router = require('express').Router();

const processParking = require('./libs/process-car-parking.lib');
const createParkingPayment = require('./libs/create-parking-payment.lib');
const processParkingPayment = require('./libs/process-parking-payment.lib');
const createParkingArea = require('./libs/create-parking-area.lib');
const getParkingDetails = require('./libs/get-parking-details.lib');
const createParkingAccess = require('./libs/parking-access.lib');
const createConfigurations = require('./libs/create-configurations.lib');
const getParkingCounts = require('./libs/get-parking-counts.lib');

router.get('/counts', async (req, res) => {
  const response = await getParkingCounts();
  return res.send({ status: response.status, data: response.message });
});

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
  return res.status(response.status).send(
    { status: response.status, data: response.message },
  );
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
  return res.send({ status: response.status, data: response.message });
});

/**
* @swagger
* info:
*   description: "Swagger comment for Car Parking API"
*   version: "1.0.0"
*   title: "Car Parking API"
* paths:
*   /api/v1/car-parking/create-parking-area:
*     post:
*       description: "Create a parking area"
*       consumes:
*         - "application/json"
*       requestBody:
*         required: true
*         content:
*           application/json:
*             schema:
*               type: "object"
*               required:
*                 - "parkingAreas"
*               properties:
*                 parkingAreas:
*                   type: "array"
*                   items:
*                     type: "object"
*                     properties:
*                       level:
*                         type: "integer"
*                         required: true
*                       vacant:
*                         type: "number"
*                         required: true
*                       occupied:
*                         type: "number"
*                         required: true
*                       pwdSlots:
*                         type: "array"
*                         required: true
*                         items:
*                           type: "integer"
*       responses:
*         200:
*           description: "Successful operation"
*           schema:
*             type: "object"
*             properties: {}
*         # Add any additional responses here
*/
router.post('/create-parking-area', async (req, res) => {
  const response = await createParkingArea(req.body);
  return res.send({ status: response.status, data: response.message });
});

/**
* @swagger
* info:
*   title: "Access Details"
*   version: "1.0.0"
*   description: "Swagger documentation for access details"
* paths:
*   /access:
*     post:
*       summary: "Create access details"
*       description: "Endpoint to create access details"
*       consumes:
*         - "application/json"
*       produces:
*         - "application/json"
*       parameters:
*         - in: "body"
*           name: "body"
*           description: "Access details object"
*           required: true
*           schema:
*             type: "object"
*             properties:
*               accessType:
*                 type: "string"
*                 example: "exit"
*               accessName:
*                 type: "string"
*                 example: "E3"
*               located:
*                 type: "integer"
*                 example: 1
*       responses:
*         200:
*           description: "Access details created successfully"
*           schema:
*             type: "object"
*             properties: {}
 */
router.post('/create-access', async (req, res) => {
  const response = await createParkingAccess(req.body);
  return res.send({ status: response.status, data: response.message });
});

/**
* @swagger
* info:
*   title: Car Parking API
*   description: API for managing car parking configurations
*   version: 1.0.0
* servers:
*   - url: http:*localhost:5000/api/v1
* paths:
*   /car-parking/create-configurations:
*     post:
*       summary: Create parking configurations
*       requestBody:
*         required: true
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*/

router.post('/create-configurations', async (req, res) => {
  const response = await createConfigurations(req.body);
  return res.send({ status: response.status, message: response.message });
});

module.exports = router;
