const User = require('../models').User


/*---------------------------------------------------
                    USER ENDPOINTS
---------------------------------------------------*/

/**
 * Get all list of user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getUsers = async function (req, res, next) {
    User.findAll()
        .then((users) => res.send(users))
        .catch((err) => res.send(err))
}

/**
 * Create a new user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createUser = async function (req, res, next) {
    User.create(req.body)
        .then(() => res.send())
        .catch((err) => res.send(err))
}

