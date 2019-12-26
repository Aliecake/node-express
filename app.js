const express = require('express');
const path = require('path');

const app = express();
const session = require('express-session');
const flash = require('connect-flash');

const mainRoutes = require('./routes/index');
const errorRoutes = require('./routes/error');

const port = process.env.PORT || 3000;

app.use('/static', express.static(path.join(__dirname, 'public')));

// Flash
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 60000 },
	})
);

app.use(flash());

app.use(mainRoutes);
app.use(errorRoutes);
app.set(`view engine`, `pug`);

// error handling
app.use((err, req, res, next) => {
	err.status = 500;
	next(err);
});

app.use((req, res, next) => {
	const err = new Error(`Page not found`);
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	res.locals.err = err;
	res.status(err.status);
	console.err(err.stack);
	req.flash('err', `${err.status} There was an error`);
	res.render(`error`, { message: req.flash('err') });
});

app.listen(port, () => {
	console.log(`Yahoo! Listening on port 3000 http://localhost:3000/`);
});

module.exports = app;
