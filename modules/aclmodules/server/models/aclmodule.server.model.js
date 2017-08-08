'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Aclmodules Schema
 */
var AclmodulesSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  roles: [{
    name: { type: String },
    policies: [{
      type: String,
      default: ['get']
    }]
  }],
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Aclmodules', AclmodulesSchema);
