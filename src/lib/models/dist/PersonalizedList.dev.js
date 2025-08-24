"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var listSchema = new _mongoose.Schema({
  market_cap_rank: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true // Removed unique: true to allow multiple users to have the same crypto

  },
  name: {
    type: String,
    required: true // Removed unique: true to allow multiple users to have the same crypto

  },
  symbol: {
    type: String,
    required: true
  },
  current_price: {
    type: Number,
    required: true
  },
  price_change_percentage_24h: {
    type: String,
    required: true
  },
  market_cap: {
    type: String,
    required: true
  },
  userId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  userName: {
    type: String,
    required: true
  }
}, {
  timestamps: true
}); // Create compound index to prevent duplicate cryptos per user
// This ensures a user can't add the same crypto twice, but different users can have the same crypto

listSchema.index({
  userId: 1,
  name: 1
}, {
  unique: true
});
listSchema.index({
  userId: 1,
  symbol: 1
}, {
  unique: true
});

var ListSchema = _mongoose.models.ListSchema || _mongoose["default"].model("ListSchema", listSchema);

var _default = ListSchema;
exports["default"] = _default;