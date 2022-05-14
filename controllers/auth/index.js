const registration = require("./registration");
const login = require("./login");
const logout = require("./logout");
const getCurrentUser = require("./getCurrentUser");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");

module.exports = {
  registration,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
};
