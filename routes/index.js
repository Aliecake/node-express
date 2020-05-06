const express = require('express');
const { projects } = require('../data.json');

const router = express.Router();

//doesn't mutate original
const reversedProjects = [...projects].reverse();

//* * HOME ROUTE */

router.get(`/`, (req, res) => {
	
	res.render(`index`, {
		projects : reversedProjects
	});
});

//* * ABOUT ROUTE */

router.get(`/about`, (req, res) => {
	res.render(`about`);
});

//* * PROJECT ROUTE */

router.get(`/project/:id`, (req, res) => {
	const id = req.params.id;
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
