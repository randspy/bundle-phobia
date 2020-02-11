var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({
    '16.8': {
      name: req.query.package,
      size: 183797,
      minified: 122333,
      gzip: 63420
    },
    '16.7': {
      name: req.query.package,
      size: 183797,
      minified: 122333,
      gzip: 63420
    },
    '16.6': {
      name: req.query.package,
      size: 183797,
      minified: 122333,
      gzip: 63420
    },
    '16.5': {
      name: req.query.package,
      size: 183797,
      minified: 122333,
      gzip: 63420
    },
    '15.0': {
      name: req.query.package,
      size: 183797,
      minified: 122333,
      gzip: 63420
    }
  });
});

module.exports = router;
