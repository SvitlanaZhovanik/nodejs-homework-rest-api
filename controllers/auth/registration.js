const { User } = require("../../models/user");
const { createError, sendMail } = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const registration = async (req, res) => {
  const { email, password } = req.body;
  const result = await User.findOne({ email });
  if (result) {
    throw createError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Подтвердите регистрацию",
    html: `<p>Нажмите для подтверждения email : <a href="http://localhost:3001/api/users/verify/${verificationToken}">Тыць</a></p>`,
  };
  await sendMail(mail);
  res.status(201).json({
    user: {
      email,
      subscription: "starter",
    },
  });
};
module.exports = registration;
