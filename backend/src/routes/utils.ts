const jwt = require('jsonwebtoken')

function generateAuthToken () {
    const token = jwt.sign({}, process.env.JWTPRIVATE, {expiresIn: "7d"})
    return token
}

module.exports = generateAuthToken