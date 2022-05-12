const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const update = async (req, res) => {
  const { _id: owner } = req.user;
  const id = req.params.contactId;
  const contact = await Contact.findOneAndUpdate({ _id: id, owner }, req.body, {
    new: true,
  });
  if (!contact) {
    throw createError(404);
  }
  res.json({
    message: "Success",
    data: contact,
  });
};

module.exports = update;
