'use strict';

module.exports = function(apap) {
	var jobQueue = require('../controllers/jobqueueController');

	app.route('/jobs')
		.get(jobQueue.getJobs)
		.post(jobQueue.createJob);
};