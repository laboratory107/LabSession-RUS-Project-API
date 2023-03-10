var express = require('express');
var router = express.Router();

const sql = require('mssql')
const dbConfig = require('../config'); 

const getAllData = async () => {
  let pool = await sql.connect(dbConfig);
  let result = await pool.request()
    .query('SELECT DeviceId, Luminance, DateTime from Measurement');

  return result;
}

const getDeviceData = async (id) => {
  let pool = await sql.connect(dbConfig);
  let result = await pool.request()
    .input('deviceId', sql.Int, id)
    .query('SELECT Luminance, DateTime from Measurement WHERE DeviceId = @deviceId');

  return result;
}

/**
 * @swagger
 * /light:
 *    get:
 *      description: Get luminance values for all devices
 *      responses:
 *        200
 */
router.get('/', async (req, res, next) => {
  const data = await getAllData();
  const resp = { 
    result : data.recordsets[0]
  };

  res.send(resp);
});

/**
 * @swagger
 * /light/:id:
 *    get:
 *      description: Get luminance values for a device
 *      responses:
 *        200
 */

router.get('/:id', async (req, res, next) => {
  const data = await getDeviceData(req.params.id);
  const resp = { 
    result : data.recordsets[0]
  };

  res.send(resp);
});

module.exports = router;
