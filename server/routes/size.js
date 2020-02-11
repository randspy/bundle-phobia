var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({
    name: req.query.package,
    size: 183797,
    minified: 122333,
    gzip: 63420
  });
});

module.exports = router;
