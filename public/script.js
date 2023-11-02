// Connect to the server's socket
const socket = io();

// Listen for state changes from the server
socket.on('stateChange', (state) => {
  const toggleSwitch = document.getElementById('toggleSwitch');
  toggleSwitch.checked = state;
  document.body.style.backgroundColor = state ? 'white' : 'black';
});

// Send state changes to the server when the user toggles the switch
document.getElementById('toggleSwitch').addEventListener('change', function() {
  socket.emit('toggleSwitch', this.checked);
});
