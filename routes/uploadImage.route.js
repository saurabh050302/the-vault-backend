const express = require("express");
const router = express.Router();

const uploadUserImage = require("../middleware/multer")
const uploadImageController = require("../controllers/uploadImage.controller")

router.post("/uploadImage", uploadUserImage, uploadImageController);

module.exports = router;