const Tokens = require('../models').Tokens
const TokenUse = require('../models').TokenUse
const crypto = require("crypto");
const { Op } = require("sequelize");

/*---------------------------------------------------
                    TOKER ENDPOINTS
---------------------------------------------------*/

exports.getTokens = async function (req, res, next) {
    Tokens.findAll()
        .then((tokens) => res.send(tokens))
        .catch((err) => res.send(err))
}


exports.createToken = async function (req, res, next) {
    token = crypto.randomInt(100000, 1000000);
    var time = new Date();
    time.setSeconds(time.getSeconds() + 60);
    Tokens.create({
        UserId: req.body.id,
        token: token,
        expiresAt: time
    })
        .then(() => res.send({ token: token, expiresAt: time }))
        .catch((err) => res.send(err))
}

exports.createTokenSocket = function (id) {
    token = crypto.randomInt(100000, 1000000);
    var time = new Date();
    time.setSeconds(time.getSeconds() + 20);
    Tokens.create({
        UserId: id,
        token: token,
        expiresAt: time
    })
    return { token: token, expiresAt: time }
}

exports.useToken = async function (req, res, next) {
    var time = new Date();
    const token = await Tokens.findOne({
        where: {
            UserId: req.body.idUser,
            token: req.body.token,
            expiresAt: {
                [Op.gte]: time
            }
        }
    })

    if (token === null) {
        res.send({ msg: 'Not found!' });
    } else {
        TokenUse.create({
            TokenId: token.id,
            UserId: token.UserId,
            createdAt: time
        })
        res.send(token);
    }
}