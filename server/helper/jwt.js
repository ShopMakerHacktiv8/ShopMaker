const jwt = require('jsonwebtoken')

function generateToken(param) {
    return jwt.sign(param,process.env.SECRET)
}

function verifyToken(param) {
    return jwt.verify(param, process.env.SECRET)
}

module.exports = {generateToken, verifyToken}

