const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const routes = require('./routes');

app.use(
	cors({
		origin: [process.env.DOMAIN, 'http://localhost:3000', 'http://127.0.0.1:3000/'],
		credentials: true,
		allowedHeaders: 'Content-Type,Authorization',
	})
);

app.use(express.json());
app.use(cookieParser());
app.use('/api', routes);
app.use('/api/blog', express.static('./uploads'));
app.use('/api/user', express.static('./uploads'));

// to create random code
// const crypto = require("crypto")
// console.log(crypto.randomBytes(32).toString("hex"));

port = process.env.PORT || 5000;
mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('DataBase Connected'))
	.catch((err) => console.log('DataBase Connecting', err.message));

// app.all('*', (req, res) => {
// 	/* 404 handling code */
// });

app.listen(port, () => console.log('app listen on port ' + port));
