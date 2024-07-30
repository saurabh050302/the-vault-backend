const express = require("express");
const router = express.Router();

const uploadUserImage = require("../middleware/multer")
const uploadImageController = require("../controllers/uploadImage.controller")
const authenticateJWT = require("../middleware/jwtAuth")

router.post("/uploadImage", authenticateJWT, uploadUserImage, uploadImageController);

module.exports = router;