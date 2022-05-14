const { User } = require("../../models/user");
const fs = require("fs/promises");
const path = require("path");
const jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { originalname, path: tempUpload } = req.file;
  const newName = `${req.user._id}_${originalname}`;
  const ava = await jimp.read(tempUpload);
  ava.resize(250, 250).write(tempUpload);
  const resultUpload = path.join(avatarsDir, newName);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", newName);
  await User.findByIdAndUpdate(req.user._id, { avatarURL });
  res.status(201).json({ avatarURL });
};

module.exports = updateAvatar;
