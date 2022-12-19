var express = require('express');
var router = express.Router();

const resp = {
  status: "Hello from RUS Admin API"
};

router.get('/', function(req, res, next) {
  res.send(resp);
});

module.exports = router;
