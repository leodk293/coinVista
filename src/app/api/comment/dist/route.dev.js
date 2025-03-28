"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GET = exports.POST = void 0;

var _server = require("next/server");

var _connectMongoDb = require("@/lib/db/connectMongoDb");

var _comments = _interopRequireDefault(require("@/lib/models/comments"));

var _users = _interopRequireDefault(require("@/lib/models/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var POST = function POST(request) {
  var _ref, message, userId, userImage, userName, userExits, newComment;

  return regeneratorRuntime.async(function POST$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _connectMongoDb.connectMongoDB)());

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(request.json());

        case 5:
          _ref = _context.sent;
          message = _ref.message;
          userId = _ref.userId;
          userImage = _ref.userImage;
          userName = _ref.userName;

          if (!(!message || !userId || !userImage || !userName)) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            message: "Some infos are missing"
          }, {
            status: 400
          }));

        case 12:
          _context.next = 14;
          return regeneratorRuntime.awrap(_users["default"].findById(userId));

        case 14:
          userExits = _context.sent;

          if (userExits) {
            _context.next = 17;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            message: "Author not found"
          }, {
            status: 404
          }));

        case 17:
          _context.next = 19;
          return regeneratorRuntime.awrap(_comments["default"].create({
            message: message,
            userId: userId,
            userImage: userImage,
            userName: userName
          }));

        case 19:
          newComment = _context.sent;
          return _context.abrupt("return", _server.NextResponse.json({
            message: 'Comment created successfully',
            comment: newComment
          }, {
            status: 201
          }));

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](0);
          console.error("Error creating comment:", _context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            message: _context.t0.message
          }, {
            status: 500
          }));

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 23]]);
};

exports.POST = POST;

var GET = function GET(request) {
  var url, userId, user, comments;
  return regeneratorRuntime.async(function GET$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _connectMongoDb.connectMongoDB)());

        case 3:
          url = new URL(request.url);
          userId = url.searchParams.get("userId");
          _context2.next = 7;
          return regeneratorRuntime.awrap(_users["default"].findById(userId));

        case 7:
          user = _context2.sent;

          if (!user) {
            _context2.next = 15;
            break;
          }

          _context2.next = 11;
          return regeneratorRuntime.awrap(_comments["default"].find());

        case 11:
          comments = _context2.sent;
          return _context2.abrupt("return", _server.NextResponse.json(comments));

        case 15:
          return _context2.abrupt("return", _server.NextResponse.json({
            message: "User not found"
          }, {
            status: 404
          }));

        case 16:
          _context2.next = 22;
          break;

        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](0);
          console.error("Error fetching comments:", _context2.t0);
          return _context2.abrupt("return", _server.NextResponse.json({
            message: _context2.t0.message
          }, {
            status: 500
          }));

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 18]]);
};

exports.GET = GET;