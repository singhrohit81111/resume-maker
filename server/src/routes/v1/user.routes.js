const express = require("express");
const router = express.Router();

router.route("/current-user").get();
router.route("/get-all-users").get();

module.exports = router;
