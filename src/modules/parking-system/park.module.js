const router = require('express').Router();

// controllers
const parkCarController = require('./libs/park-car.lib');

/**
 * @swagger
 * /api/v1/parks:
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
router.post('/', async (req, res) => {
  const response = await parkCarController(req.body);
  return res.send({ status: 200, data: response });
});

module.exports = router;
