var express = require('express');
var router = express.Router();

const sql = require('mssql')
const dbConfig = require('../config'); 

const getAllData = async () => {
  let pool = await sql.connect(dbConfig);
  let result = await pool.request()
    .query('SELECT DeviceId, Humidity, DateTime from Measurement');

  return result;
}

const getDeviceData = async (id) => {
  let pool = await sql.connect(dbConfig);
  let result = await pool.request()
    .input('deviceId', sql.Int, id)
    .query('SELECT Humidity, DateTime from Measurement WHERE DeviceId = @deviceId');

  return result;
}


/**
 * @swagger
 * /humidity:
 *    get:
 *      description: Get humidity values for a device
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
 * /humidity/:id:
 *    get:
 *      description: Get humditiy values for a device
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