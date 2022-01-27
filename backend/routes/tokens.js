var express = require('express');
var router = express.Router();
const tokens = require('../controllers/token.controller')
const tokenUse = require('../controllers/tokenUse.controller')

/* GET users listing. */
router.get('/', tokens.getTokens);

router.get('/generarToken', tokens.createToken);

router.get('/usarToken',tokens.useToken);

router.get('/use', tokenUse.getTokenUse);

module.exports = router;
