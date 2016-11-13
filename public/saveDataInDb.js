'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _petServer = require('./models/pet.server.model');

var _petServer2 = _interopRequireDefault(_petServer);

var _userServer = require('./models/user.server.model');

var _userServer2 = _interopRequireDefault(_userServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(data) {
    var _this = this;

    var _ret;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            return _context2.delegateYield(_regenerator2.default.mark(function _callee() {
              var user, promises;
              return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      user = new _userServer2.default(data.user);
                      _context.next = 3;
                      return user.save();

                    case 3:
                      promises = data.pets.map(function (pet) {
                        var petData = (0, _assign2.default)({}, pet, {
                          owner: user._id
                        });
                        return new _petServer2.default(petData).save();
                      });

                      console.log('success');
                      _context.t0 = user;
                      _context.next = 8;
                      return _promise2.default.all(promises);

                    case 8:
                      _context.t1 = _context.sent;
                      _context.t2 = {
                        user: _context.t0,
                        pets: _context.t1
                      };
                      return _context.abrupt('return', {
                        v: _context.t2
                      });

                    case 11:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, _this);
            })(), 't0', 2);

          case 2:
            _ret = _context2.t0;

            if (!((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object")) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt('return', _ret.v);

          case 5:
            _context2.next = 11;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t1 = _context2['catch'](0);

            console.log('error', _context2.t1);
            throw _context2.t1;

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 7]]);
  }));

  function saveDataInDb(_x) {
    return _ref.apply(this, arguments);
  }

  return saveDataInDb;
}();