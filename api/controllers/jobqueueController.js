'use strict';

var mongoose = require('mongoose');
var JobQueue = mongoose.model('Jobs');

exports.getJobs = function(req, res) {
	JobQueue.find({}, function(err, job) {
		res.json(job);
	});
};