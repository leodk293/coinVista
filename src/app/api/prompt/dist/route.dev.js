"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DELETE = exports.GET = exports.POST = void 0;

var _server = require("next/server");

var _connectMongoDb = require("@/lib/db/connectMongoDb");

var _prompts = _interopRequireDefault(require("@/lib/models/prompts"));

var _users = _interopRequireDefault(require("@/lib/models/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var POST = function POST(request) {
  var _ref, content, imageCount, model, ratio, userId, userExits, newPrompt;

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
          content = _ref.content;
          imageCount = _ref.imageCount;
          model = _ref.model;
          ratio = _ref.ratio;
          userId = _ref.userId;

          if (!(!content || !imageCount || !model || !ratio || !userId)) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            message: "Some infos are missing"
          }, {
            status: 400
          }));

        case 13:
          _context.next = 15;
          return regeneratorRuntime.awrap(_users["default"].findById(userId));

        case 15:
          userExits = _context.sent;

          if (userExits) {
            _context.next = 18;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            message: "Author not found"
          }, {
            status: 404
          }));

        case 18:
          _context.next = 20;
          return regeneratorRuntime.awrap(_prompts["default"].create({
            content: content,
            imageCount: imageCount,
            model: model,
            ratio: ratio,
            userId: userId
          }));

        case 20:
          newPrompt = _context.sent;
          return _context.abrupt("return", _server.NextResponse.json({
            message: 'Prompt created successfully',
            prompt: newPrompt
          }, {
            status: 201
          }));

        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](0);
          console.error("Error creating prompt:", _context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            message: _context.t0.message
          }, {
            status: 500
          }));

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 24]]);
};

exports.POST = POST;

var GET = function GET(request) {
  var url, userId, user, prompts;
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
          return regeneratorRuntime.awrap(_prompts["default"].find());

        case 11:
          prompts = _context2.sent;
          return _context2.abrupt("return", _server.NextResponse.json(prompts));

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
          console.error("Error fetching prompts:", _context2.t0);
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

var DELETE = function DELETE(request) {
  var url, id, userId, prompt;
  return regeneratorRuntime.async(function DELETE$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          url = new URL(request.url);
          id = url.searchParams.get("id");
          userId = url.searchParams.get("userId");

          if (id) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", _server.NextResponse.json({
            message: "Prompt ID not found"
          }, {
            status: 400
          }));

        case 6:
          if (userId) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", _server.NextResponse.json({
            message: "User ID required"
          }, {
            status: 401
          }));

        case 8:
          _context3.next = 10;
          return regeneratorRuntime.awrap((0, _connectMongoDb.connectMongoDB)());

        case 10:
          _context3.next = 12;
          return regeneratorRuntime.awrap(_prompts["default"].findById(id));

        case 12:
          prompt = _context3.sent;

          if (prompt) {
            _context3.next = 15;
            break;
          }

          return _context3.abrupt("return", _server.NextResponse.json({
            message: "Prompt not found"
          }, {
            status: 404
          }));

        case 15:
          _context3.next = 17;
          return regeneratorRuntime.awrap(_prompts["default"].findByIdAndDelete(id));

        case 17:
          return _context3.abrupt("return", _server.NextResponse.json({
            message: "Prompt deleted successfully"
          }, {
            status: 200
          }));

        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](0);
          console.error("Error deleting prompt:", _context3.t0);
          return _context3.abrupt("return", _server.NextResponse.json({
            message: _context3.t0.message
          }, {
            status: 500
          }));

        case 24:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 20]]);
};

exports.DELETE = DELETE;