const sgMail = require("@sendgrid/mail");

const { SENDGRID_KEY } = process.env;

sgMail.setApiKey(SENDGRID_KEY);

const sendMail = async (data) => {
  try {
    const mail = { ...data, from: "SvitlanaZhovanik@i.ua" };
    await sgMail.send(mail);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendMail;
