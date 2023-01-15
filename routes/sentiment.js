var express = require('express');
var router = express.Router();

const sql = require('mssql')
const dbConfig = require('../config'); 

const getAllData = async (top) => {
  let pool = await sql.connect(dbConfig);

  let result;
  
  if (top) 
    result = await pool.request().query('SELECT DeviceId, Status, DateTime from OwnerSentiment');
  else
    result = await pool.request().query('SELECT DeviceId, Status, DateTime from OwnerSentiment');
  
  return result;
}

const getDeviceData = async (id, top) => {
  let pool = await sql.connect(dbConfig);

  let query = 'SELECT Status, DateTime from OwnerSentiment WHERE DeviceId = @deviceId';
  if (top)
    query = 'SELECT Status, DateTime from OwnerSentiment WHERE DeviceId = @deviceId';

  let result = await pool.request()
    .input('deviceId', sql.Int, id)
    .query(query);

  return result;
}

const getDeviceAverageData = async (id) => {
  let pool = await sql.connect(dbConfig);

  let query = 'SELECT AVG(Status) As AvgSentiment from OwnerSentiment WHERE DeviceId = @deviceId';

  let result = await pool.request()
    .input('deviceId', sql.Int, id)
    .query(query);

  return result;
}

/**
 * @swagger
 * /sentiment/all:
 *    get:
 *      description: Get sentiment values for all devices
 *      responses:
 *        200
 */

router.get('/all', async (req, res, next) => {
  const data = await getAllData(false);
  const resp = { 
    result : data.recordsets[0]
  };

  res.send(resp);
});

/**
 * @swagger
 * /sentiment/all/:id:
 *    get:
 *      description: Get all sentiment values for a device
 *      responses:
 *        200
 */
router.get('/all/:id', async (req, res, next) => {
  const data = await getDeviceData(req.params.id, false);
  const resp = { 
    result : data.recordsets[0]
  };

  res.send(resp);
});

/**
 * @swagger
 * /sentiment/avg/:id:
 *    get:
 *      description: Get average sentiment value for a device
 *      responses:
 *        200
 */

router.get('/avg/:id', async (req, res, next) => {
  const data = await getDeviceAverageData(req.params.id);
  const resp = { 
    result : data.recordsets[0]
  };

  res.send(resp);
});


module.exports = router;