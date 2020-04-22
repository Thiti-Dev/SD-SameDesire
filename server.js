const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');

const app = express();

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
