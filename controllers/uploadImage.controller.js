const UserModel = require("../models/user.model")

const generateKeys = require("../utils/generateKeys")
const encryptFile = require("../utils/encryption")

const pinataSDK = require("@pinata/sdk")
const { PINATA_API_KEY, PINATA_API_SECRET } = require("../config/server.config")
const pinata = new pinataSDK(PINATA_API_KEY, PINATA_API_SECRET)

const uploadImageController = async (req, res) => {
    try {
        const userAddress = "0x796a0df3b1139e63d7cdcb798c5560e13aece0ed";

        const user = await UserModel.findOne({ userAddress });
        if (!user) throw new Error("Invalid User");

        if (user.key === null) {
            user.key = generateKeys(32);
            await user.save();
        }

        const file = req.file;
        if (!file) throw new Error("Invalid File")

        const { iv, encryptedData } = encryptFile(file.buffer, user.key);
        const pinataRes = await pinata.pinJSONToIPFS({ iv, encryptedData });
        console.log(pinataRes);

        res.status(200).json("Upload Image Successful");
    } catch (error) {
        console.log(error);
        res.status(500).json("Upload Image Failed");
    }
}

module.exports = uploadImageController;