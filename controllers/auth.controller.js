const ethers = require("ethers")
const userModel = require("../models/User")

const auth = async (req, res) => {
    try {
        const { account } = req.params;

        const { signature } = req.body;
        if (!signature) throw new Error("Invalid Signature");

        const recoveredAddress = ethers.verifyMessage("Welcome to the Vault!", signature);
        console.log(recoveredAddress);

        if (account.toLowerCase() === recoveredAddress.toLowerCase()) {
            const address = recoveredAddress.toLowerCase();
            let user = await userModel.findOne({ userAddress: address });
            if (!user) user = await userModel.create({ userAddress: address });
            res.status(200).json("Authentication Successful!");
        } else {
            throw new Error("Authentication Failed!")
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}

module.exports = auth;