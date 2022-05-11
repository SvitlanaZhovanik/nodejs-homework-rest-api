const express = require("express");
const { isValidObjectId } = require("mongoose");
const { Contact, schemas } = require("../../models/contact");
const { createError } = require("../../helpers");

const { auth } = require("../../middlewares");

const router = express.Router();

const isValid = (id) => {
  if (!isValidObjectId(id)) {
    throw createError(404);
  }
};

router.get("/", auth, async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  try {
    if (req.query.favorite) {
      const data = await Contact.find(
        { favorite: true, owner: _id },
        "-createdAt -updatedAt",
      );
      res.json({
        message: "Success",
        data,
      });
      return;
    }
    const data = await Contact.find({ owner: _id }, "-createdAt -updatedAt", {
      skip,
      limit: Number(limit),
    });
    res.json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", auth, async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const id = req.params.contactId;
    isValid(id);
    const contact = await Contact.findOne(
      { _id: id, owner },
      "-createdAt -updatedAt",
    );
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

router.post("/", auth, async (req, res, next) => {
  const { _id } = req.user;
  try {
    const { error } = schemas.add.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const body = { ...req.body, owner: _id };
    const newContact = await Contact.create(body);
    res.status(201).json({
      message: "Success",
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", auth, async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const id = req.params.contactId;
    isValid(id);
    const contacts = await Contact.findOneAndDelete({ _id: id, owner });
    if (contacts === null) {
      throw createError(404);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", auth, async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const { error } = schemas.add.validate(req.body);
    if (error) {
      throw createError(400);
    }
    const id = req.params.contactId;
    isValid(id);
    const contact = await Contact.findOneAndUpdate(
      { _id: id, owner },
      req.body,
      {
        new: true,
      },
    );
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

router.patch("/:contactId/favorite", auth, async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const { error } = schemas.updateFavorite.validate(req.body);
    if (error) {
      throw createError(400);
    }
    const id = req.params.contactId;
    isValid(id);
    const contact = await Contact.findOneAndUpdate(
      { _id: id, owner },
      req.body,
      {
        new: true,
      },
    );
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

module.exports = router;
