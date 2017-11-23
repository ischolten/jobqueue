'use strict';

module.exports = function(app) {
	var jobQueue = require('../controllers/jobqueueController');

	app.route('/jobs')
		.get(jobQueue.getJobs)
		.post(jobQueue.createJob)
		.delete(jobQueue.removeJob);

	app.route('/jobs/getStatus/:id') 
		.get(jobQueue.getStatus);

	app.route('/jobs/getHTML/:id') 
		.get(jobQueue.getHTML);

	app.route('/jobs/fetchNext')
		.get(jobQueue.getNext)
		.post(jobQueue.getNext);

	app.route('/jobs/create/:url')
		.get(jobQueue.createJob)
		.post(jobQueue.createJob);

	app.route('/jobs/update/:id/:status')
		.get(jobQueue.updateJobStatus)
		.post(jobQueue.updateJobStatus);

	app.route('/jobs/remove/:id')
		.get(jobQueue.removeJob)
		.delete(jobQueue.removeJob);



};