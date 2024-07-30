const express = require("express");
const router = express.Router();

const getImageController = require("../controllers/getImage.controller.js")
const authenticateJWT = require("../middleware/jwtAuth")

router.post("/getImage", authenticateJWT, getImageController);

module.exports = router;