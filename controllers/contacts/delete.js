const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const deleteContact = async (req, res) => {
  const { _id: owner } = req.user;
  const id = req.params.contactId;
  const contacts = await Contact.findOneAndDelete({ _id: id, owner });
  if (contacts === null) {
    throw createError(404);
  }
  res.json({ message: "contact deleted" });
};

module.exports = deleteContact;
