const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
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
};

module.exports = getAll;
