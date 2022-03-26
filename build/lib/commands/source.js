"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("source-map-support/register");

var _baseDriver = require("@appium/base-driver");

var _privateapis = _interopRequireDefault(require("@stdspa/stdspalinux_temp/dist/privateapis"));

const commands = {};

commands.getPageSource = function getPageSource() {
  _privateapis.default.a11y_clear_cache();

  if (!this._validateOrUpdateWinInfo()) {
    throw new _baseDriver.errors.NoSuchWindowError(`the selected window doesn't exist`);
  }

  const {
    pid,
    name
  } = this._win;

  const s = _privateapis.default.a11y_getWindowUiHierachy(name, pid);

  if (!s) {
    return s;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n${s}`;
};

var _default = commands;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9zb3VyY2UuanMiXSwibmFtZXMiOlsiY29tbWFuZHMiLCJnZXRQYWdlU291cmNlIiwiYXBpcyIsImExMXlfY2xlYXJfY2FjaGUiLCJfdmFsaWRhdGVPclVwZGF0ZVdpbkluZm8iLCJlcnJvcnMiLCJOb1N1Y2hXaW5kb3dFcnJvciIsInBpZCIsIm5hbWUiLCJfd2luIiwicyIsImExMXlfZ2V0V2luZG93VWlIaWVyYWNoeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQSxNQUFNQSxRQUFRLEdBQUcsRUFBakI7O0FBRUFBLFFBQVEsQ0FBQ0MsYUFBVCxHQUF5QixTQUFTQSxhQUFULEdBQTBCO0FBQ2pEQyx1QkFBS0MsZ0JBQUw7O0FBQ0EsTUFBSSxDQUFDLEtBQUtDLHdCQUFMLEVBQUwsRUFBc0M7QUFDcEMsVUFBTSxJQUFJQyxtQkFBT0MsaUJBQVgsQ0FBOEIsbUNBQTlCLENBQU47QUFDRDs7QUFDRCxRQUFNO0FBQUNDLElBQUFBLEdBQUQ7QUFBTUMsSUFBQUE7QUFBTixNQUFjLEtBQUtDLElBQXpCOztBQUNBLFFBQU1DLENBQUMsR0FBR1IscUJBQUtTLHdCQUFMLENBQThCSCxJQUE5QixFQUFvQ0QsR0FBcEMsQ0FBVjs7QUFDQSxNQUFJLENBQUNHLENBQUwsRUFBUTtBQUNOLFdBQU9BLENBQVA7QUFDRDs7QUFDRCxTQUFRLDJDQUEwQ0EsQ0FBRSxFQUFwRDtBQUNELENBWEQ7O2VBYWVWLFEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBlcnJvcnMgfSBmcm9tICdAYXBwaXVtL2Jhc2UtZHJpdmVyJztcbmltcG9ydCBhcGlzIGZyb20gJ0BzdGRzcGEvc3Rkc3BhbGludXhfdGVtcC9kaXN0L3ByaXZhdGVhcGlzJztcblxuY29uc3QgY29tbWFuZHMgPSB7fTtcblxuY29tbWFuZHMuZ2V0UGFnZVNvdXJjZSA9IGZ1bmN0aW9uIGdldFBhZ2VTb3VyY2UgKCkge1xuICBhcGlzLmExMXlfY2xlYXJfY2FjaGUoKTtcbiAgaWYgKCF0aGlzLl92YWxpZGF0ZU9yVXBkYXRlV2luSW5mbygpKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5Ob1N1Y2hXaW5kb3dFcnJvcihgdGhlIHNlbGVjdGVkIHdpbmRvdyBkb2Vzbid0IGV4aXN0YCk7XG4gIH1cbiAgY29uc3Qge3BpZCwgbmFtZX0gPSB0aGlzLl93aW47XG4gIGNvbnN0IHMgPSBhcGlzLmExMXlfZ2V0V2luZG93VWlIaWVyYWNoeShuYW1lLCBwaWQpO1xuICBpZiAoIXMpIHtcbiAgICByZXR1cm4gcztcbiAgfVxuICByZXR1cm4gYDw/eG1sIHZlcnNpb249XCIxLjBcIiBlbmNvZGluZz1cIlVURi04XCI/PlxcbiR7c31gO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29tbWFuZHM7XG4iXSwiZmlsZSI6ImxpYi9jb21tYW5kcy9zb3VyY2UuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
