const express = require('express');
const { projects } = require('../data.json');

const router = express.Router();

// error handling
router.use((err, req, res, next) => {
	err.status = 500;
	next(err);
});

router.use((req, res, next) => {
	const err = new Error(`Page not found`);
	err.status = 404;
	next(err);
});

router.use((err, req, res, next) => {
	res.locals.err = err;
	res.status(err.status);
	console.error(err.stack);
	req.flash('err', `${err.status} There was an error`);
	res.render(`error`, { message: req.flash('err') });
});

module.exports = router;
