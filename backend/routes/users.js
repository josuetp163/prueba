var express = require('express');
var router = express.Router();
const users = require('../controllers/users.controller')

/* GET users listing. */
router.get('/', users.getUsers);

router.post('/', users.createUser);



module.exports = router;
