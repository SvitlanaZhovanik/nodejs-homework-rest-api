const express = require("express");
const { schemas } = require("../../models/contact");
const { ctrlWrapper } = require("../../helpers");

const { auth, validation, validationId } = require("../../middlewares");
const {
  add,
  getAll,
  getById,
  deleteContact,
  update,
  updateFavorite,
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", auth, ctrlWrapper(getAll));

router.get("/:contactId", auth, validationId, ctrlWrapper(getById));

router.post("/", auth, validation(schemas.add), ctrlWrapper(add));

router.delete("/:contactId", auth, validationId, ctrlWrapper(deleteContact));

router.put(
  "/:contactId",
  auth,
  validation(schemas.add),
  validationId,
  ctrlWrapper(update),
);

router.patch(
  "/:contactId/favorite",
  validation(schemas.updateFavorite),
  validation,
  auth,
  ctrlWrapper(updateFavorite),
);

module.exports = router;
