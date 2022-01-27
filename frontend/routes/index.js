var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/generate/:user', function (req, res, next) {
  res.render('token', { user: req.params.user });
});

module.exports = router;
