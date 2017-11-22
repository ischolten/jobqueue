'use strict';

var mongoose = require('mongoose');
var Job = mongoose.model('Jobs');

exports.getJobs = function(req, res) {
    Job.find({}, function(err, job) {
        if (err) {
            res.send(err);
        }
    	res.json(job);
	});
};

exports.createJob = function(req, res) {
	var newJob = new Job(req.body);
	newJob.save(function(err, job) {
		if(err) {
			res.send(err);
		}
		res.json(job);
	});
}