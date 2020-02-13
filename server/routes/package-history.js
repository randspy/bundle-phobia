var express = require('express');
var router = express.Router();

function getRandomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function format(major, minor) {
  return major + '.' + minor + '.0';
}
function minorVersion(version) {
  var tokens = version.split('.');
  return format(tokens[0], getRandomNumber(+tokens[1]));
}

function majorVersion(version) {
  var tokens = version.split('.');
  return format(getRandomNumber(+tokens[0]), tokens[1]);
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

  response[minorVersion(version)] = {
    name: name,
    size: 181797,
    minified: 120333,
    gzip: 61420
  };

  response[minorVersion(version)] = {
    name: name,
    size: 177797,
    minified: 112333,
    gzip: 59420
  };

  response[minorVersion(version)] = {
    name: name,
    size: 163797,
    minified: 102333,
    gzip: 53420
  };

  response[minorVersion(version)] = {
    name: name,
    size: 133797,
    minified: 72333,
    gzip: 43420
  };

  if (+version.split('.')[0] > 0)
    response[majorVersion(version)] = {
      name: name,
      size: 123797,
      minified: 62333,
      gzip: 37420
    };

  res.send(response);
});

module.exports = router;
