'use strict';

/**
 * Module dependencies
 */
var bookPolicy = require('../policies/book.server.policy'),
  book = require('../controllers/book.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/book').all(bookPolicy.isAllowed)
    .get(book.list)
    .post(book.create);

  // Single article routes
  app.route('/api/book/:bookId').all(bookPolicy.isAllowed)
    .get(book.read)
    .put(book.update)
    .delete(book.delete);

  // Finish by binding the article middleware
  app.param('bookId', book.bookByID);
};
