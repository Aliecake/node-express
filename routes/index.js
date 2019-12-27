const express = require('express');
const { projects } = require('../data.json');

const router = express.Router();

//* * HOME ROUTE */

router.get(`/`, (req, res) => {
	console.log(projects);
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

	res.render(`project`, {
		project,
	});
});

module.exports = router;
