const express = require("express");
const { schemas } = require("../../models/user");
const { ctrlWrapper } = require("../../helpers");

const { auth, validation } = require("../../middlewares");

const {
  registration,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
} = require("../../controllers/auth");

const router = express.Router();

router.post("/signup", validation(schemas.register), ctrlWrapper(registration));

router.post("/login", validation(schemas.login), ctrlWrapper(login));
router.get("/current", auth, ctrlWrapper(getCurrentUser));
router.get("/logout", auth, ctrlWrapper(logout));
router.patch(
  "/",
  auth,
  validation(schemas.updateSubscription),
  ctrlWrapper(updateSubscription),
);

module.exports = router;
