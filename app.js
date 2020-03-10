const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();

const dataBase = require('./dataBase').getInstance();
dataBase.setModels();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(fileUpload());

const userRouter = require('./routes/userRouter.js');
const authRouter = require('./routes/authRouter.js');
const friendRouter = require('./routes/friendRouter.js');

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/friend', friendRouter);

app.use((req, res, next) => {
	const err = new Error('Page not found');
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	let e;
	const isSql = err.parent;
	if (isSql) e = err.parent.sqlMessage;
	res.status(err.status || 500).json({
		success: false,
		message: e || err.message || 'Unknown Error'
	});
});

app.listen(3000, err => {
	if (err) console.error(err);
	console.log('running on port 3000');
});
