var express = require('express');
var router = express.Router();

const sql = require('mssql')
const dbConfig = require('../config'); 

const getAllData = async (top) => {
  let pool = await sql.connect(dbConfig);

  let result;
  
  if (top) 
    result = await pool.request().query('SELECT DeviceId, Sentiment, DateTime from Measurement');
  else
    result = await pool.request().query('SELECT DeviceId, Sentiment, DateTime from Measurement');
  
  return result;
}

const getDeviceData = async (id, top) => {
  let pool = await sql.connect(dbConfig);

  let query = 'SELECT Sentiment, DateTime from Measurement WHERE DeviceId = @deviceId';
  if (top)
    query = 'SELECT Sentiment, DateTime from Measurement WHERE DeviceId = @deviceId';

  let result = await pool.request()
    .input('deviceId', sql.Int, id)
    .query(query);

  return result;
}


router.get('/all', async (req, res, next) => {
  const data = await getAllData();
  const resp = { 
    result : data.recordsets[0]
  };

  res.send(resp);
});


router.get('/all/:id', async (req, res, next) => {
  const data = await getAllData();
  const resp = { 
    result : data.recordsets[0]
  };

  res.send(resp);
});

router.get('/avg/:id/top', async (req, res, next) => {
  const data = await getDeviceData(req.params.id);
  const resp = { 
    result : data.recordsets[0]
  };

  res.send(resp);
});

router.get('/avg/:id', async (req, res, next) => {
  const data = await getDeviceData(req.params.id);
  const resp = { 
    result : data.recordsets[0]
  };

  res.send(resp);
});


module.exports = router;