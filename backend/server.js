const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const socketServer = require('./socketServer');
const friendInvitationRoutes = require('./routes/friendInvitationRoutes');
const authRoutes = require('./routes/authRoutes');

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(express.json());
app.use(cors());

// Add root route
app.get('/api', (req, res) => {
  res.send("API is running!");
});

// Register the routes
app.use('/api/auth', authRoutes);
app.use('/api/friend-invitation', friendInvitationRoutes);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Catch-all route to serve the React app for undefined routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.get('/', (req, res) => {
    res.send('Hello World')
})

console.log('Starting the server...');

const server = http.createServer(app);
socketServer.registerSocketServer(server);

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`SERVER is listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log('Database connection failed. Server not started!');
    console.error(err);
  });


// const express = require('express');
// const http = require('http');
// const cors = require('cors');
// const mongoose = require('mongoose');
// require('dotenv').config();

// const socketServer = require("./socketServer");
// const friendInvitationRoutes = require("./routes/friendInvitationRoutes");
// const authRoutes = require('./routes/authRoutes');

// const PORT = process.env.PORT || process.env.API_PORT;

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Add root route
// app.get('/', (req, res) => {
//   console.log("hello i m in!");
// });

// //register the routes
// app.use('/api/auth' , authRoutes);
// app.use('/api/friend-invitation' , friendInvitationRoutes);

// console.log("Starting the server.....");

// const server = http.createServer(app);
// socketServer.registerSocketServer(server);

// mongoose.connect(process.env.MONGO_URI)
// .then(() => {
//     server.listen(PORT, () => {
//         console.log(`SERVER is listening on ${PORT}`);
//     });
// })
// .catch(err => {
//     console.log('database connection failed. Server not started!')
//     console.error(err);
// })