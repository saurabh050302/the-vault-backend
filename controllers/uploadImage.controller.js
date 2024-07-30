const UserModel = require("../models/user.model")

const generateKeys = require("../utils/generateKeys")
const encryptFile = require("../utils/encryption")

const pinataSDK = require("@pinata/sdk")
const { PINATA_API_KEY, PINATA_API_SECRET } = require("../config/server.config")
const pinata = new pinataSDK(PINATA_API_KEY, PINATA_API_SECRET)

const uploadImageController = async (req, res) => {
    try {
        const userAddress = req.decodedAddress;

        const user = await UserModel.findOne({ userAddress });
        if (!user) throw new Error("Invalid User");

        if (user.key === null) {
            user.key = generateKeys(32);
            await user.save();
        }

        const file = req.file;
        if (!file) throw new Error("Invalid File")

        const { iv, encryptedData } = encryptFile(file.buffer, user.key);
        const pinataResponse = await pinata.pinJSONToIPFS({ iv, encryptedData });

        res.status(200).json({ ipfsHash: pinataResponse.IpfsHash, message: "Upload Images Successful" });
    } catch (error) {
        // console.log(error);
        res.status(500).json(error.message);
    }
}

module.exports = uploadImageController;