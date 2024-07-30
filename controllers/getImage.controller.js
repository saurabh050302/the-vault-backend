const UserModel = require("../models/user.model")
const decryptData = require("../utils/decryption")
const { PINATA_GATEWAY_URL } = require("../config/server.config")
const axios = require("axios")

const getIpfsResponse = async (ipfsHash, encryptionKey) => {
    const res = await axios(`${PINATA_GATEWAY_URL}${ipfsHash}`);
    const decryptedData = decryptData(res.data.encryptedData, res.data.iv, encryptionKey)
    return (decryptedData.toString("base64"));
}

const getImageController = async (req, res) => {
    try {
        const userAddress = req.decodedAddress;

        const user = await UserModel.findOne({ userAddress });
        if (!user) throw new Error("Invalid User");
        const encryptionKey = user.key;

        const { page } = req.query;
        const pageNumber = parseInt(page) > 0 ? page : 1;
        const startIndex = (pageNumber - 1) * 4;
        const endIndex = pageNumber * 4;

        const ipfsHashes = req.body;
        const ipfsHashesArray = ipfsHashes.slice(startIndex, Math.min(ipfsHashes.length, endIndex));

        const decryptedImgData = await Promise.all(ipfsHashesArray.map(async (hash) => {
            const imgData = await getIpfsResponse(hash, encryptionKey);
            return imgData;
        }))

        res.status(200).json({ message: "Images received", decryptedImgData });
    } catch (error) {
        console.log(error);
        res.status(500).json("get image failed");
    }
}

module.exports = getImageController;