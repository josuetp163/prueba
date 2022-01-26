const TokenUse = require('../models').TokenUse


exports.getTokenUse = async function (req, res, next) {
    TokenUse.findAll()
        .then((tokens) => res.send(tokens))
        .catch((err) => res.send(err))
}