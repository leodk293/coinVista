"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var fetchCryptoCurrencies = function fetchCryptoCurrencies(currency, page) {
  var response, data;
  return regeneratorRuntime.async(function fetchCryptoCurrencies$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=".concat(currency, "&order=market_cap_desc&per_page=").concat(page, "&page=1&sparkline=false")));

        case 3:
          response = _context.sent;

          if (response.ok) {
            _context.next = 6;
            break;
          }

          throw new Error("An error has occurred : ".concat(response.status));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          data = _context.sent;
          return _context.abrupt("return", data);

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0.message);
          return _context.abrupt("return", null);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

var _default = fetchCryptoCurrencies;
exports["default"] = _default;