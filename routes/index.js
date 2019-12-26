const express = require('express');
const { projects } = require('../data.json');

const router = express.Router();

router.get(`/`, (req, res) => {
	console.log(projects)
	res.render(`index`, {
		projects
	});
});

router.get(`/about`, (req, res) => {
	res.render(`about`);
});

router.get(`/project/:id`, (req, res) => {
	const id = req.params.id;
	const project = projects[id]

	res.render(`project`, {
		project
	});
});

module.exports = router;
