'use strict';

var mongoose = require('mongoose');
var Job = mongoose.model('Jobs');

var http = require('http');
var async = require('async');
var request = require('request');


// ----------- writing to db ----------- //
exports.getJobs = function(req, res) {
    Job.find({}, function(err, job) {
        if (err) {
            res.send(err);
        }
    	res.send(job);
	});
};

exports.createJob = function(req, res) {
	var newJob = new Job({"url":req.params.url, "html":null});
	newJob.save(function(err, job) {
		if(err) {
			res.send(err);
		}
		res.send(job);
	});
}


exports.getStatus = function(req, res) {
	Job.findById(req.params.id, function(err, job) {
		if(err) {
			res.send(err);
		}
		res.send(job.status[0]);
	});
}

exports.getHTML = function(req, res) {
	Job.findById(req.params.id, function(err, job) {
		if(err) {
			res.send(err);
		}
		res.send(job.html);
	});
}

exports.updateJobStatus = function(req, res) {
	if(req.params.id && req.params.status) {
		Job.findOneAndUpdate({_id: req.params.id}, {"status":[req.params.status]}, {new: true}, function(err, job) {
			if(err) {
				res.send(err);
			}
			res.send("Status updated to " + job.status);
		});
	} else {
		res.send("Enter an id and status")
	}
}

exports.removeJob = function(req, res) {
	Job.remove({_id: req.params.id}, function(err, task) {
		if(err) {
			res.send(err);
		}
		res.send("Task successfully deleted.");
	})
}

exports.getNext = function(req, res) {
	Job.find({status:['pending']}, function(err, job) {
		if(err) {
			res.send(err);
		}
		console.log(job.length);
		if(job.length > 0) {
			var id = job[0].id;
			Job.findById(id, function(err, job) {
				if(err) {
					res.send(err);
				}
				var url = job.url;
				if(url.indexOf("http") == -1) {
					url = "http://" + url;
				}
				request(url, function(err, body) {
					if(err) {
						res.send(err);
					} 
					var url = job.url;
					Job.findOneAndUpdate({_id: job.id}, {"status":['completed'], "html":body.body}, {new: true}, function(err, job) {
						if(err) {
							res.send(err);
						}
						res.send(job.id + " is complete." );
					})
				});
				
			});
		} else {
			res.send("There are no pending jobs.")
		}
		
	});
	
}
