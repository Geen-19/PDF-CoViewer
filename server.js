import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(cors({
  origin: 'https://pdf-co-viewer.vercel.app', // Replace with your Netlify frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://pdf-co-viewer.vercel.app' , // Replace with your Netlify frontend URL
    methods: ['GET', 'POST'],
  },
});
console.log('io', io);

let currentPage = 1;
let raisedHands = new Set();
let activeUsers = 0;

io.on('connection', (socket) => {
  console.log('A user connected');
  activeUsers++;
  io.emit('activeUsersChanged', activeUsers);

  // Generate a unique ID for the user
  const userId = uuidv4();
  socket.emit('userId', userId);

  // Send the current page and raised hands to the newly connected user
  socket.emit('pageChanged', currentPage);
  socket.emit('raisedHandsChanged', Array.from(raisedHands));

  socket.on('changePage', (page) => {
    console.log('changePage', page);
    currentPage = page;
    io.emit('pageChanged', currentPage);
  });

  socket.on('toggleHandRaise', (userId) => {
    console.log('toggleHandRaise', userId);
    if (raisedHands.has(userId)) {
      raisedHands.delete(userId);
    } else {
      raisedHands.add(userId);
    }
    io.emit('raisedHandsChanged', Array.from(raisedHands));
    console.log('raisedHands', raisedHands.size);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    activeUsers--;
    io.emit('activeUsersChanged', activeUsers);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Listening on *:${PORT}`);
});