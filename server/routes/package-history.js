var express = require('express');

import repository from '../bundles/repository';

var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    res.send(await repository(req.query.name));
  } catch (error) {
    res.status(500).send({
      error
    });
  }
});

module.exports = router;
