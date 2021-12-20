require('dotenv').config();
const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('express-flash');
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Connectiong to Database:
mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('***DB Connected***');
});

// Configuring Passport.js:
const passportInit = require('./app/config/passport');
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

// Configuring flash messaging:
app.use(flash());

// Declaring public folder:
app.use(express.static('public'));

// Enabling express ability to read json files and other types of data:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configuring Global Middleware:
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
});

// Setting Template Engine:
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

// Routes:
require('./routes/web')(app);

// Showing 404 not found page:
app.use((req, res) => {
    res.status(404).render();
})

// Listening at given Port:
server.listen(PORT, () => {
    console.log(`The Server is running at PORT ${PORT}`);
});

// Socket.io Configuration:
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('User Connected...');

    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    })
});