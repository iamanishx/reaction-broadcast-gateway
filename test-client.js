const io = require('socket.io-client');

// Connect to the Socket.IO server and namespace
const socket = io('http://localhost:3000/reactions');

// Handle connection
socket.on('connect', () => {
  console.log('Connected to WebSocket server');

  // Send a test reaction
  socket.emit('message', { reaction: 'clap' });
});

// Listen for the 'receiveReaction' event
socket.on('receiveReaction', (data) => {
  console.log('Received response:', data);
});

// Handle errors
socket.on('connect_error', (err) => {
  console.error('Connection error:', err.message);
});

// Handle disconnection
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
