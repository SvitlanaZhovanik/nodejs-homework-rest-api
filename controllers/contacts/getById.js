const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const getById = async (req, res) => {
  const { _id: owner } = req.user;

  const id = req.params.contactId;
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
};

module.exports = getById;
