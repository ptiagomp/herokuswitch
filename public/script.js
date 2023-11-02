// script.js
const socket = io();

socket.on('stateChange', (state) => {
  const toggleSwitch = document.getElementById('toggleSwitch');
  const userCountElement = document.getElementById('userCount');
  toggleSwitch.checked = state;
  document.body.style.backgroundColor = state ? 'white' : 'black';
  userCountElement.className = state ? 'text-dark' : 'text-light'; // Change class based on state
});

socket.on('userCount', (count) => {
  document.getElementById('userCount').textContent = `Users connected: ${count}`;
});

document.getElementById('toggleSwitch').addEventListener('change', function() {
  socket.emit('toggleSwitch', this.checked);
});
