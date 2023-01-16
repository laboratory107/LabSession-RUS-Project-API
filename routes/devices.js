var express = require('express');
var router = express.Router();

const sql = require('mssql')
const dbConfig = require('../config'); 

const getAllData = async () => {
  let pool = await sql.connect(dbConfig);
  let result = await pool.request()
    .query('SELECT d.ID as DeviceID, Name AS DeviceName, Description AS RoomDescription from Device d JOIN Room r on r.ID = d.RoomID');

  return result;
}

/**
 * @swagger
 * /devices:
 *    get:
 *      description: Get all device general data
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

module.exports = router;