const express = require("express");
const router = express.Router();

router.route("/get-resume").get();
router.route("create-resume").post();

module.exports = router;
