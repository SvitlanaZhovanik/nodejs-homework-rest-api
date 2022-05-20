const { User } = require("../../models/user");
const { createError } = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const registration = async (req, res) => {
  const { email, password } = req.body;
  const result = await User.findOne({ email });
  if (result) {
    throw createError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  await User.create({ email, password: hashPassword, avatarURL });
  res.status(201).json({
    user: {
      email,
      subscription: "starter",
    },
  });
};
module.exports = registration;
