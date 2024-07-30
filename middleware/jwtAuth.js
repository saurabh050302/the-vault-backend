const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config/server.config")

const authenticateJWT = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token) throw new Error("Invalid token");
        const decodedAddress = jwt.verify(token, JWT_SECRET);
        // console.log(decodedAddress);
        req.decodedAddress = decodedAddress;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json("Authenticate JWT failed")
    }
}

module.exports = authenticateJWT;