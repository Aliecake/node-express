const express = require('express');
const sslRedirect = require('heroku-ssl-redirect');
const path = require('path');

const app = express();
app.use(sslRedirect());

const session = require('express-session');
const flash = require('connect-flash');

const mainRoutes = require('./routes/index');
const errorRoutes = require('./routes/error');

const port = process.env.PORT || 3000;


app.use('/static', express.static(path.join(__dirname, 'public')));

// Flash error notices
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

app.listen(port, () => {
	console.log(`Yahoo! Listening on port 3000 http://localhost:3000/`);
});

module.exports = app;
