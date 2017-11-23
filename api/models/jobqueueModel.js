'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JobSchema = new Schema({
  url: {
    type: String,
    required: 'Enter a url'
  },
  created: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'completed']
    }],
    default: ['pending']
  },
  html: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model('Jobs', JobSchema);