import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

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

io.on('connection', (socket) => {
  console.log('A user connected');

  // Send the current page to the newly connected user
  socket.emit('pageChanged', currentPage);

  socket.on('changePage', (page) => {
    currentPage = page;
    io.emit('pageChanged', currentPage);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Listening on *:3000');
});