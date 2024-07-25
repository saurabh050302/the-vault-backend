const crypto = require("crypto")

const generateKeys = (length) => {
    return crypto.randomBytes(length / 2).toString('hex');
}

module.exports = generateKeys;