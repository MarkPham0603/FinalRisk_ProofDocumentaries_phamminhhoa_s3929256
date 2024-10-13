// calculator.js
const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws) => {
  let numbers = [];

  ws.on('message', (message) => {
    const messageStr = message.toString(); // Convert buffer to string
    console.log('Received:', messageStr); // Log received messages

    if (messageStr === 'OVER') {
      const sum = numbers.reduce((acc, num) => acc + num, 0);
      ws.send(`Sum: ${sum}`);
      console.log('Sent sum:', sum); // Log the sum sent to the client
      numbers = []; // Reset for the next round
    } else {
      const number = Number(messageStr);
      if (!isNaN(number)) {
        numbers.push(number);
        console.log('Numbers array:', numbers); // Log the current state of the numbers array
      } else {
        console.log('Received invalid number:', messageStr); // Log invalid number messages
      }
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
