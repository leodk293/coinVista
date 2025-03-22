"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inference = void 0;

var _inference = require("@huggingface/inference");

var inference = new _inference.HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY);
exports.inference = inference;