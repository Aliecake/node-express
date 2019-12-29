const express = require('express');
const { projects } = require('../data.json');

const router = express.Router();

//* * HOME ROUTE */

router.get(`/`, (req, res) => {
	res.render(`index`, {
		projects,
	});
});

//* * ABOUT ROUTE */

router.get(`/about`, (req, res) => {
	res.render(`about`);
});

//* * PROJECT ROUTE */

router.get(`/project/:id`, (req, res) => {
	const { id } = req.params;
	const project = projects[id];

	if (id >= projects.length) {
		res.render('error', {
			err: {
				status: `404`,
				message: `Project doesn't exist`,
				stack: `None`,
			},
		});
	} else {
		res.render(`project`, {
			project,
		});
	}
});

module.exports = router;
