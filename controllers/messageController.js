const Message = require('../models/messageModel');

const getMessages = async (req, res) => {
  try {
    const messages = await Message.getAllMessages();
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = { getMessages };