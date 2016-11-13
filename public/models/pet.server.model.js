'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var petSchema = new _mongoose.Schema({
  type: {
    type: String,
    enum: ['cat', 'dog'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  owner: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

petSchema.methods.toJSON = function () {
  // eslint-disable-line
  return _lodash2.default.pick(this, ['name', 'type', 'owner']);
};

exports.default = _mongoose2.default.model('Pet', petSchema);