const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const socketServer = require("./socketServer");
const friendInvitationRoutes = require("./routes/friendInvitationRoutes");
const authRoutes = require('./routes/authRoutes');

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(express.json());
app.use(cors());

// Add root route
app.get('/', (req, res) => {
  console.log("hello i m in!");
});

//register the routes
app.use('/api/auth' , authRoutes);
app.use('/api/friend-invitation' , friendInvitationRoutes);

console.log("Starting the server.....");

const server = http.createServer(app);
socketServer.registerSocketServer(server);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    server.listen(PORT, () => {
        console.log(`SERVER is listening on ${PORT}`);
    });
})
.catch(err => {
    console.log('database connection failed. Server not started!')
    console.error(err);
})