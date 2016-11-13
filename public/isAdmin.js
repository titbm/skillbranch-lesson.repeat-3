'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (request, response, next) {
  if (request.headers.user === 'admin') {
    return next();
  }
  return next('access error');
};