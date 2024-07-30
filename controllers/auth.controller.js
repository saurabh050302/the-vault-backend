const ethers = require("ethers")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config/server.config")

const authController = async (req, res) => {
    try {
        const { account } = req.params;

        const { signature } = req.body;
        if (!signature) throw new Error("Invalid Signature");

        const recoveredAddress = ethers.verifyMessage("Welcome to the Vault!", signature);

        if (account.toLowerCase() === recoveredAddress.toLowerCase()) {
            const userAddress = recoveredAddress.toLowerCase();
            let user = await userModel.findOne({ userAddress });
            if (!user) user = await userModel.create({ userAddress });
            const token = jwt.sign(userAddress, JWT_SECRET);
            // res.cookie("jwt", token, { maxAge: 900000, httpOnly: true, }).status(200).json("Authentication Successful & Cookie set");
            res.status(200).json({ message: "Authentication Successful & jwt received", "jwt": token });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json("Auth Failed");
    }
}

module.exports = authController;