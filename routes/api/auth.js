const express = require("express");
const { schemas } = require("../../models/user");
const { ctrlWrapper } = require("../../helpers");

const { auth, validation, upload } = require("../../middlewares");

const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post(
  "/signup",
  validation(schemas.register),
  ctrlWrapper(ctrl.registration),
);
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verification));
router.post("/login", validation(schemas.login), ctrlWrapper(ctrl.login));
router.post(
  "/verify",
  validation(schemas.verificationEmail),
  ctrl.getEmailVerificationToken,
);
router.get("/current", auth, ctrlWrapper(ctrl.getCurrentUser));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.patch(
  "/",
  auth,
  validation(schemas.updateSubscription),
  ctrlWrapper(ctrl.updateSubscription),
);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar),
);

module.exports = router;
