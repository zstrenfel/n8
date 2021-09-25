var express = require('express');
var router = express.Router();

router.get('/webpage/count', (req, res) => {
  res.send('Hello World!');
})

module.exports = router;