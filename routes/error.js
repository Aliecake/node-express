const express = require('express');

const router = express.Router();

//* * 500s */
router.use((err, req, res, next) => {
	err.status = 500;
	next(err);
});

//* * 404 */
router.use((req, res, next) => {
	const err = new Error(`Page not found`);
	err.status = 404;
	next(err);
});

//* * ERROR ROUTE */
router.use((err, req, res, next) => {
	res.locals.err = err;
	res.status(err.status);
	console.error(err.stack);
	req.flash('err', `${err.status} ${err.message}`);
	res.render(`error`, { message: req.flash('err') });
});

module.exports = router;
