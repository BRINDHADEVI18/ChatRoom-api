const jwt = require('jsonwebtoken');
const Message = require('../models/messageModel');

const initChatSocket = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Authentication error: no token'));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch (err) {
      next(new Error('Authentication error: invalid token'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User ${socket.user.id} connected`);

    socket.on('sendMessage', async (text) => {
      try {
        const message = await Message.createMessage(socket.user.id, text);
        io.emit('receiveMessage', message);
      } catch (err) {
        console.error('Error saving message:', err.message);
      }
    });

    socket.on('disconnect', () => {
      console.log(`User ${socket.user.id} disconnected`);
    });
  });
};

module.exports = initChatSocket;