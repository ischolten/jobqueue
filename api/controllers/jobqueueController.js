'use strict';

var mongoose = require('mongoose');
var Job = mongoose.model('Jobs');

exports.getJobs = function(req, res) {
    Job.find({}, function(err, job) {
        if (err) {
            res.send(err);
        }
    	res.send(job);
	});
};

exports.createJob = function(req, res) {
	var newJob = new Job({"name":req.params.name});
	newJob.save(function(err, job) {
		if(err) {
			res.send(err);
		}
		res.send(job);
	});
}


exports.getJobStatus = function(req, res) {
	Job.findById(req.params.id, function(err, job) {
		if(err) {
			res.send(err);
		}
		res.send(job.status[0]);
	});
}

exports.updateJobStatus = function(req, res) {
	Job.findOneAndUpdate({_id: req.params.id}, {"status":[req.params.status]}, {new: true}, function(err, job) {
		if(err) {
			res.send(err);
		}
		res.send("Status updated to " + job.status);
	});

}