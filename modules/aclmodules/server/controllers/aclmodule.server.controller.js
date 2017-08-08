'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Aclmodules = mongoose.model('Aclmodules'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an aclmodule
 */
exports.create = function (req, res) {
  var aclmodule = new Aclmodules(req.body);
  aclmodule.user = req.user;

  aclmodule.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(aclmodule);
    }
  });
};

/**
 * Show the current aclmodule
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var aclmodule = req.aclmodule ? req.aclmodule.toJSON() : {};

  // Add a custom field to the Aclmodules, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Aclmodules model.
  aclmodule.isCurrentUserOwner = !!(req.user && aclmodule.user && aclmodule.user._id.toString() === req.user._id.toString());
  res.json(aclmodule);
};

/**
 * Update an aclmodule
 */
exports.update = function (req, res) {
  var aclmodule = req.aclmodule;

  aclmodule.name = req.body.name;
  aclmodule.roles = req.body.roles;

  aclmodule.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(aclmodule);
    }
  });
};

/**
 * Delete an aclmodule
 */
exports.delete = function (req, res) {
  var aclmodule = req.aclmodule;

  aclmodule.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(aclmodule);
    }
  });
};

/**
 * List of Aclmodules
 */
exports.list = function (req, res) {
  Aclmodules.find().sort('-created').populate('user', 'displayName').exec(function (err, aclmodule) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(aclmodule);
    }
  });
};

/**
 * aclmodule middleware
 */
exports.aclById = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'ACL is invalid'
    });
  }

  Aclmodules.findById(id).populate('user', 'displayName').exec(function (err, aclmodule) {
    if (err) {
      return next(err);
    } else if (!aclmodule) {
      return res.status(404).send({
        message: 'No aclmodule with that identifier has been found'
      });
    }
    req.aclmodule = aclmodule;
    next();
  });
};

exports.aclByName = function (req, res, next, name) {

  Aclmodules.findOne({ 'name': name }).populate('user', 'displayName').exec(function (err, aclmodule) {
    if (err) {
      return next(err);
    } else if (!aclmodule) {
      return res.status(404).send({
        message: 'No aclmodule with that identifier has been found'
      });
    }
    req.aclmodule = aclmodule;
    next();
  });
};
