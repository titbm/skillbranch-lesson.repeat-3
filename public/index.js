'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _saveDataInDb = require('./saveDataInDb');

var _saveDataInDb2 = _interopRequireDefault(_saveDataInDb);

var _petServer = require('./models/pet.server.model');

var _petServer2 = _interopRequireDefault(_petServer);

var _userServer = require('./models/user.server.model');

var _userServer2 = _interopRequireDefault(_userServer);

var _isAdmin = require('./isAdmin');

var _isAdmin2 = _interopRequireDefault(_isAdmin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var open = require('open');

var SERVER = (0, _express2.default)();
var PORT = process.env.PORT || 3000;

_mongoose2.default.Promise = _bluebird2.default;
_mongoose2.default.connect('mongodb://titbm:012i012p@ds151697.mlab.com:51697/skillbranch-3a-homework');

SERVER.use((0, _cors2.default)());
SERVER.use(_express2.default.static('public'));
SERVER.use(_bodyParser2.default.json());
// SERVER.use(isAdmin);

SERVER.get('/clear', _isAdmin2.default, function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(request, response) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _userServer2.default.remove({});

          case 2:
            _context.next = 4;
            return _petServer2.default.remove({});

          case 4:
            return _context.abrupt('return', response.send('ok'));

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

SERVER.get('/users', function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(request, response) {
    var users;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _userServer2.default.find();

          case 2:
            users = _context2.sent;
            return _context2.abrupt('return', response.json(users));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

SERVER.get('/pets', function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(request, response) {
    var pets;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _petServer2.default.find().populate('owner');

          case 2:
            pets = _context3.sent;
            return _context3.abrupt('return', response.json(pets));

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

SERVER.post('/data', function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(request, response) {
    var data, user, result;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            data = request.body;

            if (data.user) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt('return', response.status(400).send('user required'));

          case 3:
            if (!data.pets) data.pets = [];

            _context4.next = 6;
            return _userServer2.default.findOne({ name: data.user.name });

          case 6:
            user = _context4.sent;

            if (user) response.status(400).send('user.name is exists');

            _context4.prev = 8;
            _context4.next = 11;
            return (0, _saveDataInDb2.default)(data);

          case 11:
            result = _context4.sent;
            return _context4.abrupt('return', response.json(result));

          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4['catch'](8);
            return _context4.abrupt('return', response.status(500).send(_context4.t0));

          case 18:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[8, 15]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

SERVER.listen(PORT, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log(_chalk2.default.cyan('Server is up on port: ' + PORT));
    // open("http://localhost:" + PORT);
  }
});