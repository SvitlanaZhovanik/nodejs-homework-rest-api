const { createError, sendMail } = require("../../helpers");
const { User } = require("../../models/user");

const getEmailVerificationToken = async (req, res) => {
  const { email } = req.body;
  const user = User.findOne({ email });
  if (!user) {
    throw createError(401);
  }
  if (user.verify) {
    throw createError(400, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Подтвердите регистрацию",
    html: `<a target="_blank> href="localhost:3001/api/users/verify/${user.verificationToken}> Нажмите для подтверждения email</a>`,
  };
  await sendMail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = getEmailVerificationToken;
