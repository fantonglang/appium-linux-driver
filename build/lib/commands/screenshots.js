"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("source-map-support/register");

var _privateapis = _interopRequireDefault(require("@stdspa/stdspalinux_temp/dist/privateapis"));

var _fs = _interopRequireDefault(require("fs"));

var _sharp = _interopRequireDefault(require("sharp"));

const commands = {};

commands.getScreenshot = function () {
  if (!this._win) {
    return null;
  }

  const {
    wid
  } = this._win;

  if (_privateapis.default.c_winscreenshot(Number.parseInt(wid), "appiumdriver")) {
    const content = _fs.default.readFileSync("/tmp/.stdspa/appiumdriver.png", {
      encoding: 'base64'
    });

    return content;
  }

  return null;
};

commands.getElementScreenshot = async function (elementId) {
  if (!this._win) {
    return null;
  }

  const {
    wid
  } = this._win;

  const {
    x,
    y,
    width,
    height
  } = this._findElRect(elementId);

  const {
    x: winX,
    y: winY
  } = this.getWindowRect();

  if (_privateapis.default.c_winscreenshot(Number.parseInt(wid), "appiumdriver")) {
    const data = await (0, _sharp.default)("/tmp/.stdspa/appiumdriver.png").extract({
      left: x - winX,
      top: y - winY,
      width: width,
      height: height
    }).png().toBuffer();
    return data.toString('base64');
  }

  return null;
};

var _default = commands;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9zY3JlZW5zaG90cy5qcyJdLCJuYW1lcyI6WyJjb21tYW5kcyIsImdldFNjcmVlbnNob3QiLCJfd2luIiwid2lkIiwiYXBpcyIsImNfd2luc2NyZWVuc2hvdCIsIk51bWJlciIsInBhcnNlSW50IiwiY29udGVudCIsImZzIiwicmVhZEZpbGVTeW5jIiwiZW5jb2RpbmciLCJnZXRFbGVtZW50U2NyZWVuc2hvdCIsImVsZW1lbnRJZCIsIngiLCJ5Iiwid2lkdGgiLCJoZWlnaHQiLCJfZmluZEVsUmVjdCIsIndpblgiLCJ3aW5ZIiwiZ2V0V2luZG93UmVjdCIsImRhdGEiLCJleHRyYWN0IiwibGVmdCIsInRvcCIsInBuZyIsInRvQnVmZmVyIiwidG9TdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBRUEsTUFBTUEsUUFBUSxHQUFHLEVBQWpCOztBQUVBQSxRQUFRLENBQUNDLGFBQVQsR0FBeUIsWUFBWTtBQUNuQyxNQUFJLENBQUMsS0FBS0MsSUFBVixFQUFnQjtBQUNkLFdBQU8sSUFBUDtBQUNEOztBQUNELFFBQU07QUFBQ0MsSUFBQUE7QUFBRCxNQUFRLEtBQUtELElBQW5COztBQUNBLE1BQUlFLHFCQUFLQyxlQUFMLENBQXFCQyxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JKLEdBQWhCLENBQXJCLEVBQTJDLGNBQTNDLENBQUosRUFBZ0U7QUFDOUQsVUFBTUssT0FBTyxHQUFHQyxZQUFHQyxZQUFILENBQWdCLCtCQUFoQixFQUFpRDtBQUFDQyxNQUFBQSxRQUFRLEVBQUU7QUFBWCxLQUFqRCxDQUFoQjs7QUFDQSxXQUFPSCxPQUFQO0FBQ0Q7O0FBQ0QsU0FBTyxJQUFQO0FBQ0QsQ0FWRDs7QUFZQVIsUUFBUSxDQUFDWSxvQkFBVCxHQUFnQyxnQkFBZ0JDLFNBQWhCLEVBQTJCO0FBQ3pELE1BQUksQ0FBQyxLQUFLWCxJQUFWLEVBQWdCO0FBQ2QsV0FBTyxJQUFQO0FBQ0Q7O0FBQ0QsUUFBTTtBQUFDQyxJQUFBQTtBQUFELE1BQVEsS0FBS0QsSUFBbkI7O0FBQ0EsUUFBTTtBQUFDWSxJQUFBQSxDQUFEO0FBQUlDLElBQUFBLENBQUo7QUFBT0MsSUFBQUEsS0FBUDtBQUFjQyxJQUFBQTtBQUFkLE1BQXdCLEtBQUtDLFdBQUwsQ0FBaUJMLFNBQWpCLENBQTlCOztBQUNBLFFBQU07QUFBQ0MsSUFBQUEsQ0FBQyxFQUFFSyxJQUFKO0FBQVVKLElBQUFBLENBQUMsRUFBRUs7QUFBYixNQUFxQixLQUFLQyxhQUFMLEVBQTNCOztBQUNBLE1BQUlqQixxQkFBS0MsZUFBTCxDQUFxQkMsTUFBTSxDQUFDQyxRQUFQLENBQWdCSixHQUFoQixDQUFyQixFQUEyQyxjQUEzQyxDQUFKLEVBQWdFO0FBQzlELFVBQU1tQixJQUFJLEdBQUcsTUFBTSxvQkFBTSwrQkFBTixFQUNoQkMsT0FEZ0IsQ0FDUjtBQUFDQyxNQUFBQSxJQUFJLEVBQUVWLENBQUMsR0FBR0ssSUFBWDtBQUFpQk0sTUFBQUEsR0FBRyxFQUFFVixDQUFDLEdBQUdLLElBQTFCO0FBQWdDSixNQUFBQSxLQUFLLEVBQUVBLEtBQXZDO0FBQThDQyxNQUFBQSxNQUFNLEVBQUVBO0FBQXRELEtBRFEsRUFFaEJTLEdBRmdCLEdBR2hCQyxRQUhnQixFQUFuQjtBQUlBLFdBQU9MLElBQUksQ0FBQ00sUUFBTCxDQUFjLFFBQWQsQ0FBUDtBQUNEOztBQUNELFNBQU8sSUFBUDtBQUNELENBZkQ7O2VBaUJlNUIsUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhcGlzIGZyb20gJ0BzdGRzcGEvc3Rkc3BhbGludXhfdGVtcC9kaXN0L3ByaXZhdGVhcGlzJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgc2hhcnAgZnJvbSAnc2hhcnAnO1xuXG5jb25zdCBjb21tYW5kcyA9IHt9O1xuXG5jb21tYW5kcy5nZXRTY3JlZW5zaG90ID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMuX3dpbikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGNvbnN0IHt3aWR9ID0gdGhpcy5fd2luO1xuICBpZiAoYXBpcy5jX3dpbnNjcmVlbnNob3QoTnVtYmVyLnBhcnNlSW50KHdpZCksIFwiYXBwaXVtZHJpdmVyXCIpKSB7XG4gICAgY29uc3QgY29udGVudCA9IGZzLnJlYWRGaWxlU3luYyhcIi90bXAvLnN0ZHNwYS9hcHBpdW1kcml2ZXIucG5nXCIsIHtlbmNvZGluZzogJ2Jhc2U2NCd9KTtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbmNvbW1hbmRzLmdldEVsZW1lbnRTY3JlZW5zaG90ID0gYXN5bmMgZnVuY3Rpb24gKGVsZW1lbnRJZCkge1xuICBpZiAoIXRoaXMuX3dpbikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGNvbnN0IHt3aWR9ID0gdGhpcy5fd2luO1xuICBjb25zdCB7eCwgeSwgd2lkdGgsIGhlaWdodH0gPSB0aGlzLl9maW5kRWxSZWN0KGVsZW1lbnRJZCk7XG4gIGNvbnN0IHt4OiB3aW5YLCB5OiB3aW5ZfSA9IHRoaXMuZ2V0V2luZG93UmVjdCgpO1xuICBpZiAoYXBpcy5jX3dpbnNjcmVlbnNob3QoTnVtYmVyLnBhcnNlSW50KHdpZCksIFwiYXBwaXVtZHJpdmVyXCIpKSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHNoYXJwKFwiL3RtcC8uc3Rkc3BhL2FwcGl1bWRyaXZlci5wbmdcIilcbiAgICAgIC5leHRyYWN0KHtsZWZ0OiB4IC0gd2luWCwgdG9wOiB5IC0gd2luWSwgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodH0pXG4gICAgICAucG5nKClcbiAgICAgIC50b0J1ZmZlcigpO1xuICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCdiYXNlNjQnKTsgICAgXG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb21tYW5kcztcbiJdLCJmaWxlIjoibGliL2NvbW1hbmRzL3NjcmVlbnNob3RzLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=
