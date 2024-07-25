const ethers = require("ethers")
const userModel = require("../models/user.model")

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
            res.status(200).json("Authentication Successful!");
        } else {
            throw new Error("Authentication Failed!")
        }
    } catch (error) {
        console.log(error);
        res.status(500).json("Auth Failed");
    }
}

module.exports = authController;