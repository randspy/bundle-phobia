var express = require('express');
var router = express.Router();

// it needs some tests if there is time, not all all the cases covered
function generateVersion(version, howMuchLess) {
  var multiplier = 100;
  var tokens = version.split('.');
  var firstTwoSegmentsOfVersion = tokens[0] + '.' + tokens[1];
  var olderVersion =
    (+firstTwoSegmentsOfVersion * multiplier - +howMuchLess * multiplier) /
    multiplier;
  return olderVersion.toFixed(2) + '.0';
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  var name = req.query.name;
  var version = req.query.version;
  var response = {};

  response[version] = {
    name: name,
    size: 183797,
    minified: 122333,
    gzip: 63420
  };

  response[generateVersion(version, '0.1')] = {
    name: name,
    size: 181797,
    minified: 120333,
    gzip: 61420
  };

  response[generateVersion(version, '0.2')] = {
    name: name,
    size: 177797,
    minified: 112333,
    gzip: 59420
  };

  response[generateVersion(version, '0.3')] = {
    name: name,
    size: 163797,
    minified: 102333,
    gzip: 53420
  };

  response[generateVersion(version, '0.4')] = {
    name: name,
    size: 133797,
    minified: 72333,
    gzip: 43420
  };

  response[generateVersion(version, '1')] = {
    name: name,
    size: 123797,
    minified: 62333,
    gzip: 37420
  };

  res.send(response);
});

module.exports = router;
