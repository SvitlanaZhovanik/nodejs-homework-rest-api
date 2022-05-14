const auth = require("./validationTokenMiddleware");
const validation = require("./validation");
const validationId = require("./validationId");
const upload = require("./upload");

module.exports = { auth, validation, validationId, upload };
