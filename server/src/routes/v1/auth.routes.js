const express = require("express");
const validate = require("../../middlewares/validate.middleware");
const { authController } = require("../../controllers");
const { authValidation } = require("../../validations");
const router = express.Router();

router
  .route("/register")
  .post(validate(authValidation.register), authController.register);
router.route("/login").post(authController.login);
router.route("/udpate-password").post();
router.route("/logout").post();

module.exports = router;
