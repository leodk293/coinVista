"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DELETE = exports.POST = exports.GET = void 0;

var _PersonalizedList = _interopRequireDefault(require("@/lib/models/PersonalizedList"));

var _users = _interopRequireDefault(require("@/lib/models/users"));

var _server = require("next/server");

var _connectMongoDb = require("@/lib/db/connectMongoDb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// GET - Fetch user's cryptocurrency list
var GET = function GET(request) {
  var _ref, searchParams, userId, user, cryptoList;

  return regeneratorRuntime.async(function GET$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _connectMongoDb.connectMongoDB)());

        case 3:
          // Get userId from query parameters or headers
          _ref = new URL(request.url), searchParams = _ref.searchParams;
          userId = searchParams.get('userId');

          if (userId) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            error: "User ID is required"
          }, {
            status: 400
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(_users["default"].findById(userId));

        case 9:
          user = _context.sent;

          if (user) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            error: "User not found"
          }, {
            status: 404
          }));

        case 12:
          _context.next = 14;
          return regeneratorRuntime.awrap(_PersonalizedList["default"].find({
            userId: userId
          }).sort({
            market_cap_rank: 1
          }) // Sort by market cap rank
          .populate('userId', 'name email'));

        case 14:
          cryptoList = _context.sent;
          return _context.abrupt("return", _server.NextResponse.json({
            success: true,
            data: cryptoList,
            count: cryptoList.length
          }, {
            status: 200
          }));

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          console.error("GET Error:", _context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            error: "Failed to fetch cryptocurrency list"
          }, {
            status: 500
          }));

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 18]]);
}; // POST - Add cryptocurrency to user's list


exports.GET = GET;

var POST = function POST(request) {
  var body, market_cap_rank, image, name, symbol, current_price, price_change_percentage_24h, market_cap, userId, userName, user, existingEntry, newCrypto;
  return regeneratorRuntime.async(function POST$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _connectMongoDb.connectMongoDB)());

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(request.json());

        case 5:
          body = _context2.sent;
          market_cap_rank = body.market_cap_rank, image = body.image, name = body.name, symbol = body.symbol, current_price = body.current_price, price_change_percentage_24h = body.price_change_percentage_24h, market_cap = body.market_cap, userId = body.userId, userName = body.userName; // Validation - Check for required fields

          if (!(!market_cap_rank || !image || !name || !symbol || current_price === undefined || price_change_percentage_24h === undefined || !market_cap || !userId || !userName)) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", _server.NextResponse.json({
            success: false,
            error: "All fields are required"
          }, {
            status: 400
          }));

        case 9:
          _context2.next = 11;
          return regeneratorRuntime.awrap(_users["default"].findById(userId));

        case 11:
          user = _context2.sent;

          if (user) {
            _context2.next = 14;
            break;
          }

          return _context2.abrupt("return", _server.NextResponse.json({
            success: false,
            error: "User not found"
          }, {
            status: 404
          }));

        case 14:
          _context2.next = 16;
          return regeneratorRuntime.awrap(_PersonalizedList["default"].findOne({
            $and: [{
              userId: userId
            }, {
              $or: [{
                name: name
              }, {
                symbol: symbol.toUpperCase()
              }]
            }]
          }));

        case 16:
          existingEntry = _context2.sent;

          if (!existingEntry) {
            _context2.next = 19;
            break;
          }

          return _context2.abrupt("return", _server.NextResponse.json({
            success: false,
            error: "Cryptocurrency already exists in your list"
          }, {
            status: 409
          }));

        case 19:
          // Create new cryptocurrency entry
          newCrypto = new _PersonalizedList["default"]({
            market_cap_rank: market_cap_rank,
            image: image,
            name: name,
            symbol: symbol.toUpperCase(),
            current_price: current_price,
            price_change_percentage_24h: price_change_percentage_24h.toString(),
            market_cap: market_cap.toString(),
            userId: userId,
            userName: userName
          });
          _context2.next = 22;
          return regeneratorRuntime.awrap(newCrypto.save());

        case 22:
          _context2.next = 24;
          return regeneratorRuntime.awrap(newCrypto.populate('userId', 'name email'));

        case 24:
          return _context2.abrupt("return", _server.NextResponse.json({
            success: true,
            data: newCrypto,
            message: "Cryptocurrency added to list successfully"
          }, {
            status: 201
          }));

        case 27:
          _context2.prev = 27;
          _context2.t0 = _context2["catch"](0);
          console.error("POST Error:", _context2.t0); // Handle duplicate key errors (from compound indexes)

          if (!(_context2.t0.code === 11000)) {
            _context2.next = 32;
            break;
          }

          return _context2.abrupt("return", _server.NextResponse.json({
            success: false,
            error: "This cryptocurrency is already in your list"
          }, {
            status: 409
          }));

        case 32:
          return _context2.abrupt("return", _server.NextResponse.json({
            success: false,
            error: "Failed to add cryptocurrency to list"
          }, {
            status: 500
          }));

        case 33:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 27]]);
}; // DELETE - Remove cryptocurrency from user's list


exports.POST = POST;

var DELETE = function DELETE(request) {
  var _ref2, searchParams, cryptoId, userId, user, deletedCrypto;

  return regeneratorRuntime.async(function DELETE$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap((0, _connectMongoDb.connectMongoDB)());

        case 3:
          _ref2 = new URL(request.url), searchParams = _ref2.searchParams;
          cryptoId = searchParams.get('id');
          userId = searchParams.get('userId');

          if (!(!cryptoId || !userId)) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", _server.NextResponse.json({
            error: "Cryptocurrency ID and User ID are required"
          }, {
            status: 400
          }));

        case 8:
          _context3.next = 10;
          return regeneratorRuntime.awrap(_users["default"].findById(userId));

        case 10:
          user = _context3.sent;

          if (user) {
            _context3.next = 13;
            break;
          }

          return _context3.abrupt("return", _server.NextResponse.json({
            error: "User not found"
          }, {
            status: 404
          }));

        case 13:
          _context3.next = 15;
          return regeneratorRuntime.awrap(_PersonalizedList["default"].findOneAndDelete({
            _id: cryptoId,
            userId: userId // Ensure user can only delete their own entries

          }));

        case 15:
          deletedCrypto = _context3.sent;

          if (deletedCrypto) {
            _context3.next = 18;
            break;
          }

          return _context3.abrupt("return", _server.NextResponse.json({
            error: "Cryptocurrency not found in your list"
          }, {
            status: 404
          }));

        case 18:
          return _context3.abrupt("return", _server.NextResponse.json({
            success: true,
            data: deletedCrypto,
            message: "Cryptocurrency removed from list successfully"
          }, {
            status: 200
          }));

        case 21:
          _context3.prev = 21;
          _context3.t0 = _context3["catch"](0);
          console.error("DELETE Error:", _context3.t0);
          return _context3.abrupt("return", _server.NextResponse.json({
            error: "Failed to remove cryptocurrency from list"
          }, {
            status: 500
          }));

        case 25:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 21]]);
};

exports.DELETE = DELETE;