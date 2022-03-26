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

  if (_privateapis.default.c_winscreenshot(Number.parseInt(wid, 10), 'appiumdriver')) {
    const content = _fs.default.readFileSync('/tmp/.stdspa/appiumdriver.png', {
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

  if (_privateapis.default.c_winscreenshot(Number.parseInt(wid, 10), 'appiumdriver')) {
    const data = await (0, _sharp.default)('/tmp/.stdspa/appiumdriver.png').extract({
      left: x - winX,
      top: y - winY,
      width,
      height
    }).png().toBuffer();
    return data.toString('base64');
  }

  return null;
};

var _default = commands;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9zY3JlZW5zaG90cy5qcyJdLCJuYW1lcyI6WyJjb21tYW5kcyIsImdldFNjcmVlbnNob3QiLCJfd2luIiwid2lkIiwiYXBpcyIsImNfd2luc2NyZWVuc2hvdCIsIk51bWJlciIsInBhcnNlSW50IiwiY29udGVudCIsImZzIiwicmVhZEZpbGVTeW5jIiwiZW5jb2RpbmciLCJnZXRFbGVtZW50U2NyZWVuc2hvdCIsImVsZW1lbnRJZCIsIngiLCJ5Iiwid2lkdGgiLCJoZWlnaHQiLCJfZmluZEVsUmVjdCIsIndpblgiLCJ3aW5ZIiwiZ2V0V2luZG93UmVjdCIsImRhdGEiLCJleHRyYWN0IiwibGVmdCIsInRvcCIsInBuZyIsInRvQnVmZmVyIiwidG9TdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBRUEsTUFBTUEsUUFBUSxHQUFHLEVBQWpCOztBQUVBQSxRQUFRLENBQUNDLGFBQVQsR0FBeUIsWUFBWTtBQUNuQyxNQUFJLENBQUMsS0FBS0MsSUFBVixFQUFnQjtBQUNkLFdBQU8sSUFBUDtBQUNEOztBQUNELFFBQU07QUFBQ0MsSUFBQUE7QUFBRCxNQUFRLEtBQUtELElBQW5COztBQUNBLE1BQUlFLHFCQUFLQyxlQUFMLENBQXFCQyxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JKLEdBQWhCLEVBQXFCLEVBQXJCLENBQXJCLEVBQStDLGNBQS9DLENBQUosRUFBb0U7QUFDbEUsVUFBTUssT0FBTyxHQUFHQyxZQUFHQyxZQUFILENBQWdCLCtCQUFoQixFQUFpRDtBQUFDQyxNQUFBQSxRQUFRLEVBQUU7QUFBWCxLQUFqRCxDQUFoQjs7QUFDQSxXQUFPSCxPQUFQO0FBQ0Q7O0FBQ0QsU0FBTyxJQUFQO0FBQ0QsQ0FWRDs7QUFZQVIsUUFBUSxDQUFDWSxvQkFBVCxHQUFnQyxnQkFBZ0JDLFNBQWhCLEVBQTJCO0FBQ3pELE1BQUksQ0FBQyxLQUFLWCxJQUFWLEVBQWdCO0FBQ2QsV0FBTyxJQUFQO0FBQ0Q7O0FBQ0QsUUFBTTtBQUFDQyxJQUFBQTtBQUFELE1BQVEsS0FBS0QsSUFBbkI7O0FBQ0EsUUFBTTtBQUFDWSxJQUFBQSxDQUFEO0FBQUlDLElBQUFBLENBQUo7QUFBT0MsSUFBQUEsS0FBUDtBQUFjQyxJQUFBQTtBQUFkLE1BQXdCLEtBQUtDLFdBQUwsQ0FBaUJMLFNBQWpCLENBQTlCOztBQUNBLFFBQU07QUFBQ0MsSUFBQUEsQ0FBQyxFQUFFSyxJQUFKO0FBQVVKLElBQUFBLENBQUMsRUFBRUs7QUFBYixNQUFxQixLQUFLQyxhQUFMLEVBQTNCOztBQUNBLE1BQUlqQixxQkFBS0MsZUFBTCxDQUFxQkMsTUFBTSxDQUFDQyxRQUFQLENBQWdCSixHQUFoQixFQUFxQixFQUFyQixDQUFyQixFQUErQyxjQUEvQyxDQUFKLEVBQW9FO0FBQ2xFLFVBQU1tQixJQUFJLEdBQUcsTUFBTSxvQkFBTSwrQkFBTixFQUNoQkMsT0FEZ0IsQ0FDUjtBQUFDQyxNQUFBQSxJQUFJLEVBQUVWLENBQUMsR0FBR0ssSUFBWDtBQUFpQk0sTUFBQUEsR0FBRyxFQUFFVixDQUFDLEdBQUdLLElBQTFCO0FBQWdDSixNQUFBQSxLQUFoQztBQUF1Q0MsTUFBQUE7QUFBdkMsS0FEUSxFQUVoQlMsR0FGZ0IsR0FHaEJDLFFBSGdCLEVBQW5CO0FBSUEsV0FBT0wsSUFBSSxDQUFDTSxRQUFMLENBQWMsUUFBZCxDQUFQO0FBQ0Q7O0FBQ0QsU0FBTyxJQUFQO0FBQ0QsQ0FmRDs7ZUFpQmU1QixRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwaXMgZnJvbSAnQHN0ZHNwYS9zdGRzcGFsaW51eF90ZW1wL2Rpc3QvcHJpdmF0ZWFwaXMnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBzaGFycCBmcm9tICdzaGFycCc7XG5cbmNvbnN0IGNvbW1hbmRzID0ge307XG5cbmNvbW1hbmRzLmdldFNjcmVlbnNob3QgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghdGhpcy5fd2luKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgY29uc3Qge3dpZH0gPSB0aGlzLl93aW47XG4gIGlmIChhcGlzLmNfd2luc2NyZWVuc2hvdChOdW1iZXIucGFyc2VJbnQod2lkLCAxMCksICdhcHBpdW1kcml2ZXInKSkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBmcy5yZWFkRmlsZVN5bmMoJy90bXAvLnN0ZHNwYS9hcHBpdW1kcml2ZXIucG5nJywge2VuY29kaW5nOiAnYmFzZTY0J30pO1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuY29tbWFuZHMuZ2V0RWxlbWVudFNjcmVlbnNob3QgPSBhc3luYyBmdW5jdGlvbiAoZWxlbWVudElkKSB7XG4gIGlmICghdGhpcy5fd2luKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgY29uc3Qge3dpZH0gPSB0aGlzLl93aW47XG4gIGNvbnN0IHt4LCB5LCB3aWR0aCwgaGVpZ2h0fSA9IHRoaXMuX2ZpbmRFbFJlY3QoZWxlbWVudElkKTtcbiAgY29uc3Qge3g6IHdpblgsIHk6IHdpbll9ID0gdGhpcy5nZXRXaW5kb3dSZWN0KCk7XG4gIGlmIChhcGlzLmNfd2luc2NyZWVuc2hvdChOdW1iZXIucGFyc2VJbnQod2lkLCAxMCksICdhcHBpdW1kcml2ZXInKSkge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBzaGFycCgnL3RtcC8uc3Rkc3BhL2FwcGl1bWRyaXZlci5wbmcnKVxuICAgICAgLmV4dHJhY3Qoe2xlZnQ6IHggLSB3aW5YLCB0b3A6IHkgLSB3aW5ZLCB3aWR0aCwgaGVpZ2h0fSlcbiAgICAgIC5wbmcoKVxuICAgICAgLnRvQnVmZmVyKCk7XG4gICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29tbWFuZHM7XG4iXSwiZmlsZSI6ImxpYi9jb21tYW5kcy9zY3JlZW5zaG90cy5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLiJ9
