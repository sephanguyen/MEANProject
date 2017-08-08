'use strict';

/**
 * Module dependencies
 */
var config = require('../config/server.config'),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Schema
 */
var ModuleSchema = new Schema({
  title: {
    type: String
  },
  author: {
    type: String
  }
});

mongoose.model(config.nameModule, ModuleSchema);
