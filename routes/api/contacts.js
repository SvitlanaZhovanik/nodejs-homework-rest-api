const express = require("express");
const { isValidObjectId } = require("mongoose");
const Contact = require("../../models/contact");
const { createError } = require("../../helpers");
const {
  addContactValidation,
  updateFavoriteSchema,
} = require("../../middlewares/validationContactMiddleware");

const router = express.Router();

const isValid = (id) => {
  if (!isValidObjectId(id)) {
    throw createError(404);
  }
};

router.get("/", async (req, res, next) => {
  try {
    const data = await Contact.find({}, "-createdAt -updatedAt");
    res.json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    isValid(id);
    const contact = await Contact.findById(id, "-createdAt -updatedAt");
    if (!contact) {
      throw createError(404);
    }
    res.json({
      message: "Success",
      data: contact,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", addContactValidation, async (req, res, next) => {
  try {
    const { body } = req;
    const newContact = await Contact.create(body, "-createdAt -updatedAt");
    res.status(201).json({
      message: "Success",
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    isValid(id);
    const contacts = await Contact.findByIdAndDelete(id);
    if (contacts === null) {
      throw createError(404);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", addContactValidation, async (req, res, next) => {
  try {
    const id = req.params.contactId;
    isValid(id);
    const contact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!contact) {
      throw createError(404);
    }
    res.json({
      message: "Success",
      data: contact,
    });
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:contactId/favorite",
  updateFavoriteSchema,
  async (req, res, next) => {
    try {
      const id = req.params.contactId;
      isValid(id);
      const contact = await Contact.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!contact) {
        throw createError(404);
      }
      res.json({
        message: "Success",
        data: contact,
      });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
