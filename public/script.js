const socket = io();

socket.on('stateChange', (state) => {
  const toggleSwitch = document.getElementById('toggleSwitch');
  toggleSwitch.checked = state;
  document.body.style.backgroundColor = state ? 'white' : 'black';
});

document.getElementById('toggleSwitch').addEventListener('change', function() {
  socket.emit('toggleSwitch', this.checked);
});
