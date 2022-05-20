const express = require("express");
const { schemas } = require("../../models/contact");
const { ctrlWrapper } = require("../../helpers");

const { auth, validation, validationId } = require("../../middlewares");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", auth, validationId, ctrlWrapper(ctrl.getById));

router.post("/", auth, validation(schemas.add), ctrlWrapper(ctrl.add));

router.delete(
  "/:contactId",
  auth,
  validationId,
  ctrlWrapper(ctrl.deleteContact),
);

router.put(
  "/:contactId",
  auth,
  validationId,
  validation(schemas.add),
  ctrlWrapper(ctrl.update),
);

router.patch(
  "/:contactId/favorite",
  auth,
  validationId,
  validation(schemas.updateFavorite),
  ctrlWrapper(ctrl.updateFavorite),
);

module.exports = router;
