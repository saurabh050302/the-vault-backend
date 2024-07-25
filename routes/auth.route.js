const express = require("express")
const router = express.Router();

const authController = require("../controllers/auth.controller")

router.post("/auth/:account", authController)

module.exports = router;