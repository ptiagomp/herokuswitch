const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

let switchState = false;

io.on('connection', (socket) => {
  socket.emit('stateChange', switchState);

  socket.on('toggleSwitch', (state) => {
    switchState = state;
    io.emit('stateChange', switchState); // Emit to all clients
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
