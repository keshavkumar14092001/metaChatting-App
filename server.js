const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const PORT = process.env.PORT || 5000;

// Declaring Public Folder:
app.use(express.static('public'));

// Setting Up the template Engine:
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

// Routes:
require('./routes/route')(app);

// Showing 404 not found page:
app.use((req, res) => {
    res.status(404).render();
})

// Listening to the Server:
server.listen(PORT, () => {
    console.log(`The Server is running at PORT ${PORT}`);
})

// Socket.io Connection:
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('User Connected...');

    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    })
});