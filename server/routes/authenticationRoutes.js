const express = require("express");
const { signUp, signIn, googleAuthentication } = require("../controllers/authenticationController");

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/google", googleAuthentication);

module.exports = router;