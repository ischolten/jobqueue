'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JobSchema = new Schema({
	name: {
		type: String,
		required: 'Please enter the name of the job'
	},
	Created_date: {
		type: Date,
		default: Date.now
	},
	status: {
		type: [{
			type: String,
			enum: ['pending', 'in progress', 'completed']
		}],
		default: ['pending']
	}
});

module.exports = mongoose.model('Jobs', JobSchema);