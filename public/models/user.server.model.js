'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSchema = new _mongoose.Schema({
  name: { type: String, required: true }
}, {
  timestamps: true
});

userSchema.methods.toJSON = function () {
  // eslint-disable-line
  return _lodash2.default.pick(this, ['name']);
};

exports.default = _mongoose2.default.model('User', userSchema);