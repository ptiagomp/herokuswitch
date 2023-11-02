const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the public directory
app.use(express.static('public'));

// This variable holds the state of the switch
let switchState = false;
// This variable holds the count of connected users
let userCount = 0;

// Set up socket connection
io.on('connection', (socket) => {
  userCount++; // Increment user count on new connection
  io.emit('userCount', userCount); // Emit the user count to all clients

  // Emit the current state to the newly connected client
  socket.emit('stateChange', switchState);

  // Listen for switch toggles and broadcast the change to all clients
  socket.on('toggleSwitch', (state) => {
    switchState = state;
    io.emit('stateChange', switchState); // Emit to all connected clients
  });

  // Decrement user count on disconnection and emit the new count
  socket.on('disconnect', () => {
    userCount--;
    io.emit('userCount', userCount);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
