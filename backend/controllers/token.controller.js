const Tokens = require('../models').Tokens
const TokenUse = require('../models').TokenUse
const User = require('../models').User
const crypto = require("crypto");
const { Op } = require("sequelize");

/*---------------------------------------------------
                    TOKER ENDPOINTS
---------------------------------------------------*/

/**
 * Get all generated tokens 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getTokens = async function (req, res, next) {
    Tokens.findAll()
        .then((tokens) => res.send(tokens))
        .catch((err) => res.send(err))
}

/**
 * Create a new token by get endpoint - Client (Username) in query required
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createToken = async function (req, res, next) {
    if (!req.query.cliente) {
        res.status(401).send({ msg: "ERROR!" })
    } else {
        const user = await User.findOne({ where: { username: req.query.cliente, } })
        token = crypto.randomInt(100000, 1000000);
        var time = new Date();
        time.setMinutes(time.getMinutes() + 1);
        Tokens.create({
            UserId: user.id,
            token: token,
            expiresAt: time
        })
            .then(() => res.send({ token: token, expiresAt: time }))
            .catch((err) => res.send(err))
    }
}

/**
 * Create a new token by the socket connected to the frontend - Username required.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createTokenSocket = async function (username) {
    const user = await User.findOne({ where: { username: username, } })
    token = crypto.randomInt(100000, 1000000);
    var time = new Date();
    time.setMinutes(time.getMinutes() + 1);
    Tokens.create({
        UserId: user.id,
        token: token,
        expiresAt: time
    })
    return { token: token, expiresAt: time }
}

/**
 * Make use of a token. Client (Username) and token in query required.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.useToken = async function (req, res, next) {
    if (!req.query.cliente || !req.query.token) {
        res.status(401).send({ msg: "ERROR!" })
    } else {
        var time = new Date();
        const user = await User.findOne({ where: { username: req.query.cliente, } })
        const token = await Tokens.findOne({
            where: {
                UserId: user.id,
                token: req.query.token,
                expiresAt: {
                    [Op.gte]: time
                }
            }
        })

        if (token === null) {
            res.send({ msg: 'Token incorrecto.' });
        } else {
            TokenUse.create({
                TokenId: token.id,
                UserId: token.UserId,
                createdAt: time
            })
            res.send({ response: "Token usado correctamente!!" });
        }
    }

}