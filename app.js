const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // For development. Restrict this in production.
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.get('/', (req, res) => {
  res.send('🟢 Chat server running.');
});

io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  socket.on('send-message', (msg) => {
    console.log(`📨 Message from ${socket.id}: ${msg}`);
    socket.broadcast.emit('receive-message', msg);
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
