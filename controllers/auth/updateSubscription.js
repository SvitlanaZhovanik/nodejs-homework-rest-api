const { User } = require("../../models/user");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const userUpdate = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  res.status(201).json({
    email: userUpdate.email,
    subscription: userUpdate.subscription,
  });
};

module.exports = updateSubscription;
