const User = require('../models').User


/*---------------------------------------------------
                    USER ENDPOINTS
---------------------------------------------------*/

exports.getUsers = async function (req, res, next) {
    User.findAll()
        .then((users) => res.send(users))
        .catch((err) => res.send(err))
}

exports.createUser = async function (req, res, next) {
    User.create(req.body)
        .then(() => res.send())
        .catch((err) => res.send(err))
}

