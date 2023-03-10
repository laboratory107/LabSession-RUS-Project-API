var express = require('express');
var router = express.Router();

const sql = require('mssql')
const dbConfig = require('../config'); 

const getDeviceData = async (id) => {
  let pool = await sql.connect(dbConfig);
  let result = await pool.request()
    .input('deviceId', sql.Int, id)
    .query('SELECT Temperature, Humidity, Luminance from Measurement WHERE DeviceId = @deviceId');

  return result;
}

/**
 * @swagger
 * /measumerents:
 *    get:
 *      description: Get all measurements for a device
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