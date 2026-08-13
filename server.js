require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const messageRoutes = require('./routes/messageRoutes');
const initChatSocket = require('./sockets/chatSocket');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api', messageRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

initChatSocket(io);

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Chat server running on port ${PORT}`));