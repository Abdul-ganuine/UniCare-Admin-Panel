const { BadRequest } = require("../CustomErrors");
const asyncWrapper = require("../MiddleWare/async");
const ChatModel = require("../Models/ChatModel");
const studentsApi = require("../Models/studentsApi");
const studentUsers = require("../Models/studentUsers");
const Users = require("../Models/Users");

// find user function
const findUserModel = async (userId) => {
  let user = await studentUsers.findById(userId);
  if (user) {
    const findDetails = await studentsApi.findOne({ id: user.student_id });
    return { model: "studentUsers", user, findDetails };
  }

  user = await Users.findById(userId);
  if (user) {
    return { model: "Users", user };
  }

  return null; // User not found in either model
};

const accessSingleChat = asyncWrapper(async (req, res) => {
  const { userId } = req.body;
  const id = req.user.id;

  const participant = await findUserModel(userId);

  // console.log(participant);

  const details = {
    username: participant.user.username,
    img: participant.user.img,
    online: participant.user.online,
    lastSeen: participant.user.lastSeen,
    fullname: `${participant.findDetails.surname} ${participant.findDetails.other_names}`,
    year: participant.findDetails.year,
    student_id: participant.findDetails.id,
    contact: participant.findDetails.contact,
    telecel: participant.findDetails.school_vodafone_number,
    email: participant.findDetails.email,
    hall: participant.findDetails.hall,
    programme: participant.findDetails.program,
  };

  if (!userId) {
    throw new BadRequest(`no userId is provided`);
  }

  // Find the chat between the two users and populate sender details
  let chat = await ChatModel.findOne({
    participants: { $all: [id, userId] },
  }).populate("messages.sender", "username img");
  if (!chat) {
    chat = new ChatModel({ participants: [id, userId], messages: [] });
    await chat.save();

    chat = await ChatModel.findById(chat._id).populate(
      "messages.sender",
      "username img"
    );
  }

  res.json({ chat, details });
});

const sendMessage = asyncWrapper(async (req, res) => {
  const { message, chatId } = req.body;
  const id = req.user.id;

  let chat = await ChatModel.findOne({ _id: chatId });
  chat.messages.push({ sender: id, text: message });
  await chat.save();

  chat = await ChatModel.findById(chat._id).populate(
    "messages.sender",
    "username img"
  );

  res.status(200).send(chat);
});

const chatParticipant = asyncWrapper(async (req, res) => {
  const { chatId } = req.body;
  // console.log(chatId);
});
module.exports = { accessSingleChat, sendMessage, chatParticipant };
