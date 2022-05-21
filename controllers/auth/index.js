const registration = require("./registration");
const login = require("./login");
const logout = require("./logout");
const getCurrentUser = require("./getCurrentUser");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const verification = require("./verificationToken");
const getEmailVerificationToken = require("./getEmailVerificationToken");

module.exports = {
  registration,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
  verification,
  getEmailVerificationToken,
};
