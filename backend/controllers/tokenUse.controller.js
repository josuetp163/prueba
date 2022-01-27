const TokenUse = require('../models').TokenUse

/**
 * Get list of token use
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getTokenUse = async function (req, res, next) {
    TokenUse.findAll()
        .then((tokens) => res.send(tokens))
        .catch((err) => res.send(err))
}