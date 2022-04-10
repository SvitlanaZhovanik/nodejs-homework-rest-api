const express = require("express");
const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const data = await listContacts();
  res.json({
    message: "Success",
    data,
  });
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) {
    res.status(404).json({
      message: "Not found",
    });
  }
  res.json({
    message: "Success",
    data: contact,
  });
});

router.post("/", async (req, res, next) => {
  const newContact = await addContact(req.body);
  res.status(201).json({
    message: "Success",
    data: newContact,
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const contacts = await removeContact(req.params.contactId);
  if (contacts === null) {
    res.status(404).json({ message: "Not found" });
  }
  res.json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const contact = await updateContact(req.params.contactId, req.body);
  if (!contact) {
    res.status(404).json({
      message: "Not found",
    });
  }
  res.json({
    message: "Success",
    data: contact,
  });
});

module.exports = router;
