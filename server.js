const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');

const app = express();

//
// ─── SOCKET ─────────────────────────────────────────────────────────────────────
//
const socketIO = require('socket.io');
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── LOADING ENV VARIABLES ──────────────────────────────────────────────────────
//
dotenv.config({ path: './config/config.env' });
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── MIDDLEWARE ─────────────────────────────────────────────────────────────────
//
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.json());
// ────────────────────────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
	console.log(
		`The server is currently running in ${process.env.NODE_ENV.rainbow.bgWhite} ${'mode on port'.yellow.bold} ${PORT
			.rainbow.bgWhite}`.yellow.bold
	);
});

const io = socketIO.listen(server);
// Waiting for the peer to be connected
io.on('connection', (client) => {
	console.log('user connected');

	// When some of the peers disconnect
	client.on('disconnect', () => {
		console.log('user disconnected');
	});

	// Listener from peers
	client.on('sent-message', function(message) {
		// Emit all to the active peers
		io.sockets.emit('new-message', message);
	});
});
