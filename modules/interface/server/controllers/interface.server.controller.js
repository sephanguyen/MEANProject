'use strict';

/**
 * Module dependencies
 */
var config = require('../config/server.config'),
  path = require('path'),
  mongoose = require('mongoose'),
  Modules = mongoose.model(config.nameModule),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create
 */
exports.create = function (req, res) {
  var modules = new Modules(req.body);

  modules.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(modules);
    }
  });
};

/**
 * Show
 */
exports.read = function (req, res) {
  // Convert mongoose document to JSON
  var modules = req.modules ? req.modules.toJSON() : {};

  res.json(modules);
};

/**
 * Update
 */
exports.update = function (req, res) {
  var modules = req.modules;

  modules.title = req.body.title;
  modules.author = req.body.author;

  modules.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(modules);
    }
  });
};

/**
 * Delete
 */
exports.delete = function (req, res) {
  var modules = req.modules;

  modules.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(modules);
    }
  });
};

/**
 * List
 */
exports.list = function (req, res) {
  Modules.find().exec(function (err, modules) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(modules);
    }
  });
};

/**
 * Params
 */
exports.byID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: config.nameModule.toUpperCase() + ' is invalid'
    });
  }

  Modules.findById(id).exec(function (err, modules) {
    if (err) {
      return next(err);
    } else if (!modules) {
      return res.status(404).send({
        message: 'No ' + config.nameModule.toUpperCase() + ' with that identifier has been found'
      });
    }
    req.modules = modules;
    next();
  });
};
