const express = require("express");
const {
  accessSingleChat,
  sendMessage,
  chatParticipant,
} = require("../Controllers/chats");
const router = express.Router();

router.route("/").post(accessSingleChat);
router.route("/send").post(sendMessage);
router.route("/participant").post(chatParticipant);
// router.route("/creategroup").post(createGroupChat);
// router.route("/renamegroup").put(renameGroup);
// router.route("/remove").put(removeFromGroup);
// router.route("/add").put(addToGroup);

module.exports = router;
