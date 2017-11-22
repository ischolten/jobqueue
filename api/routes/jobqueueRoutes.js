'use strict';

module.exports = function(app) {
	var jobQueue = require('../controllers/jobqueueController');

	app.route('/jobs')
		.get(jobQueue.getJobs)
		.post(jobQueue.createJob);

	app.route('/jobs/get') 
		.get(jobQueue.getJobs);

	app.route('/jobs/create/:name')
		.get(jobQueue.createJob);

};