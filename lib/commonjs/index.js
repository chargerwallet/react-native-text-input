"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports.default = void 0;
var _Input = _interopRequireDefault(require("./Input.js"));
var _TextInputViewNativeComponent = require("./TextInputViewNativeComponent.js");
Object.keys(_TextInputViewNativeComponent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _TextInputViewNativeComponent[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _TextInputViewNativeComponent[key];
    }
  });
});
var _enum = require("./enum.js");
Object.keys(_enum).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _enum[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _enum[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// @ts-expect-error

const TextInput = _Input.default;
var _default = exports.default = TextInput;
//# sourceMappingURL=index.js.map