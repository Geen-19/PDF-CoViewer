import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your client's origin
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Replace with your client's origin
    methods: ['GET', 'POST'],
  },
});
console.log('io', io);

let currentPage = 1;
let raisedHands = new Set();

io.on('connection', (socket) => {
  console.log('A user connected');

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
  });
});

server.listen(3000, () => {
  console.log('Listening on *:3000');
});