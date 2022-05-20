const { Contact } = require("../../models/contact");

const add = async (req, res) => {
  const { _id } = req.user;
  const body = { ...req.body, owner: _id };
  const newContact = await Contact.create(body);
  res.status(201).json({
    message: "Success",
    data: newContact,
  });
};

module.exports = add;
