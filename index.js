


const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();
require('./config/db');

const app = express();
const server = http.createServer(app); // Use http server for socket.io
const io = new Server(server, {
  cors: {
    origin: '*', // You can restrict this to your frontend origin
    methods: ['GET', 'POST']
  }
});

// Setup socket.io reference
const { setupSocketIO } = require('./controller/dataController');
setupSocketIO(io);

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const auth = require('./router/auth');
app.use('/api/auth', auth);

const data = require('./router/dataRoutes');
app.use('/api/data', data);

// Listen with http server
server.listen(PORT, () => {
  console.log(`Server start running on PORT ${PORT}`);
});
