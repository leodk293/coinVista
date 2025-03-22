"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;

var _server = require("next/server");

var _hf = require("@/utils/hf");

var _url = require("url");

function POST(request) {
  var _parse, query, type, formData, prompt, out, buffer, baseUrl, imageUrl;

  return regeneratorRuntime.async(function POST$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _parse = (0, _url.parse)(request.url, true), query = _parse.query;
          type = query.type;
          _context.next = 4;
          return regeneratorRuntime.awrap(request.formData());

        case 4:
          formData = _context.sent;
          _context.prev = 5;

          if (!(type == "ttimg")) {
            _context.next = 20;
            break;
          }

          prompt = formData.get("prompt");
          _context.next = 10;
          return regeneratorRuntime.awrap(_hf.inference.textToImage({
            model: "stabilityai/stable-diffusion-xl-base-1.0",
            inputs: prompt,
            parameters: {
              negative_prompt: "blurry"
            }
          }));

        case 10:
          out = _context.sent;
          console.log(out);
          _context.t0 = Buffer;
          _context.next = 15;
          return regeneratorRuntime.awrap(out.arrayBuffer());

        case 15:
          _context.t1 = _context.sent;
          buffer = _context.t0.from.call(_context.t0, _context.t1);

          /*const imagePath = path.join(
            process.cwd(),
            "public",
            "images",
            "generated-image.jpg"
          );*/
          //await fs.writeFile(imagePath, buffer);
          baseUrl = "http://localhost:3001";
          imageUrl = "".concat(baseUrl, "/images/generated-image.jpg");
          return _context.abrupt("return", _server.NextResponse.json({
            message: imageUrl
          }, {
            status: 200
          }));

        case 20:
          _context.next = 26;
          break;

        case 22:
          _context.prev = 22;
          _context.t2 = _context["catch"](5);
          console.log(_context.t2);
          return _context.abrupt("return", _server.NextResponse.json({
            error: _context.t2
          }, {
            status: 500
          }));

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 22]]);
}