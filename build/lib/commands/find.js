"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.commands = void 0;

require("source-map-support/register");

var _baseDriver = require("@appium/base-driver");

var _privateapis = _interopRequireDefault(require("@stdspa/stdspalinux_temp/dist/privateapis"));

var _xpath = _interopRequireDefault(require("xpath.js"));

var _xmldom = require("xmldom");

var _uuid = require("uuid");

const commands = {};
exports.commands = commands;

commands._validateOrUpdateWinInfo = function () {
  const {
    pid,
    wid,
    name
  } = this._win;

  const winHierachy = _privateapis.default.app_getWindowHierachy();

  const doc = new _xmldom.DOMParser().parseFromString(winHierachy);
  let xpath = `//*[@pid="${pid}" and @wid="${wid}" and @InputOutput="true" and (@name="${name}" or contains(concat(" ", @class, " "), "${" " + name + " "}"))]`;
  const nodes = (0, _xpath.default)(doc, xpath);

  if (nodes && nodes.length > 0) {
    return true;
  }

  try {
    const win = this._getWinAndPid_FromWinId(wid);

    this._win = win;
  } catch {
    return false;
  }

  return true;
};

commands.findElOrEls = async function findElOrEls(strategy, selector, mult, context) {
  let a11yHierachy = null;

  if (!context) {
    _privateapis.default.a11y_clear_cache();

    if (!this._validateOrUpdateWinInfo()) {
      throw new _baseDriver.errors.NoSuchWindowError(`the selected window doesn't exist`);
    }

    const {
      pid,
      name
    } = this._win;
    a11yHierachy = _privateapis.default.a11y_getWindowUiHierachy(name, pid);
  } else {
    a11yHierachy = this._cache.get(context);

    if (!a11yHierachy) {
      throw new _baseDriver.errors.UnknownError(`context ${context} has expired`);
    }
  }

  const doc = new _xmldom.DOMParser().parseFromString(a11yHierachy);
  let xpath = null;

  if (strategy == 'name') {
    xpath = `//*[@name="${selector}"]`;
  } else if (strategy == 'class name') {
    xpath = `//*[contains(concat(" ", @class, " "), "${" " + selector + " "}")]`;
  } else if (strategy == 'xpath') {
    xpath = selector;
  } else {
    xpath = selector;
  }

  let nodes = (0, _xpath.default)(doc, xpath);

  if (!nodes || nodes.length === 0) {
    nodes = [];
  }

  const serializer = new _xmldom.XMLSerializer();

  if (mult) {
    let elements = [];

    for (const node of nodes) {
      const str = serializer.serializeToString(node);
      const key = (0, _uuid.v4)();

      this._cache.set(key, str);

      elements.push({
        "element-6066-11e4-a52e-4f735466cecf": key,
        "ELEMENT": key
      });
    }

    return elements;
  } else {
    if (nodes.length === 0) {
      throw new _baseDriver.errors.NoSuchElementError();
    }

    const node = nodes[0];
    const str = serializer.serializeToString(node);
    const key = (0, _uuid.v4)();

    this._cache.set(key, str);

    return {
      "element-6066-11e4-a52e-4f735466cecf": key,
      "ELEMENT": key
    };
  }
};

var _default = commands;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9maW5kLmpzIl0sIm5hbWVzIjpbImNvbW1hbmRzIiwiX3ZhbGlkYXRlT3JVcGRhdGVXaW5JbmZvIiwicGlkIiwid2lkIiwibmFtZSIsIl93aW4iLCJ3aW5IaWVyYWNoeSIsImFwaXMiLCJhcHBfZ2V0V2luZG93SGllcmFjaHkiLCJkb2MiLCJkb20iLCJwYXJzZUZyb21TdHJpbmciLCJ4cGF0aCIsIm5vZGVzIiwibGVuZ3RoIiwid2luIiwiX2dldFdpbkFuZFBpZF9Gcm9tV2luSWQiLCJmaW5kRWxPckVscyIsInN0cmF0ZWd5Iiwic2VsZWN0b3IiLCJtdWx0IiwiY29udGV4dCIsImExMXlIaWVyYWNoeSIsImExMXlfY2xlYXJfY2FjaGUiLCJlcnJvcnMiLCJOb1N1Y2hXaW5kb3dFcnJvciIsImExMXlfZ2V0V2luZG93VWlIaWVyYWNoeSIsIl9jYWNoZSIsImdldCIsIlVua25vd25FcnJvciIsInNlcmlhbGl6ZXIiLCJYTUxTZXJpYWxpemVyIiwiZWxlbWVudHMiLCJub2RlIiwic3RyIiwic2VyaWFsaXplVG9TdHJpbmciLCJrZXkiLCJzZXQiLCJwdXNoIiwiTm9TdWNoRWxlbWVudEVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBLE1BQU1BLFFBQVEsR0FBRyxFQUFqQjs7O0FBRUFBLFFBQVEsQ0FBQ0Msd0JBQVQsR0FBb0MsWUFBVztBQUM3QyxRQUFNO0FBQUNDLElBQUFBLEdBQUQ7QUFBTUMsSUFBQUEsR0FBTjtBQUFXQyxJQUFBQTtBQUFYLE1BQW1CLEtBQUtDLElBQTlCOztBQUNBLFFBQU1DLFdBQVcsR0FBR0MscUJBQUtDLHFCQUFMLEVBQXBCOztBQUNBLFFBQU1DLEdBQUcsR0FBRyxJQUFJQyxpQkFBSixHQUFVQyxlQUFWLENBQTBCTCxXQUExQixDQUFaO0FBQ0EsTUFBSU0sS0FBSyxHQUFJLGFBQVlWLEdBQUksZUFBY0MsR0FBSSx5Q0FBd0NDLElBQUssNENB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QUFDTCxRQUFJbkIsS0FBSyxDQUFDQyxNQUFOLEtBQWlCLENBQXJCLEVBQXdCO0FBQ3RCLFlBQU0sSUFBSVUsbUJBQU9lLGtCQUFYLEVBQU47QUFDRDs7QUFDRCxVQUFNTixJQUFJLEdBQUdwQixLQUFLLENBQUMsQ0FBRCxDQUFsQjtBQUNBLFVBQU1xQixHQUFHLEdBQUdKLFVBQVUsQ0FBQ0ssaUJBQVgsQ0FBNkJGLElBQTdCLENBQVo7QUFDQSxVQUFNRyxHQUFHLEdBQUcsZUFBWjs7QUFDQSxTQUFLVCxNQUFMLENBQVlVLEdBQVosQ0FBZ0JELEdBQWhCLEVBQXFCRixHQUFyQjs7QUFDQSxXQUFPO0FBQ0wsNkNBQXVDRSxHQURsQztBQUVMLGlCQUFXQTtBQUZOLEtBQVA7QUFJRDtBQUNGLENBMUREOztlQThEZXBDLFEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBlcnJvcnMgfSBmcm9tICdAYXBwaXVtL2Jhc2UtZHJpdmVyJztcbmltcG9ydCBhcGlzIGZyb20gJ0BzdGRzcGEvc3Rkc3BhbGludXhfdGVtcC9kaXN0L3ByaXZhdGVhcGlzJztcbmltcG9ydCBzZWxlY3QgZnJvbSAneHBhdGguanMnO1xuaW1wb3J0IHsgRE9NUGFyc2VyIGFzIGRvbSwgWE1MU2VyaWFsaXplciB9IGZyb20gJ3htbGRvbSc7XG5pbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJztcblxuY29uc3QgY29tbWFuZHMgPSB7fTtcblxuY29tbWFuZHMuX3ZhbGlkYXRlT3JVcGRhdGVXaW5JbmZvID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHtwaWQsIHdpZCwgbmFtZX0gPSB0aGlzLl93aW47XG4gIGNvbnN0IHdpbkhpZXJhY2h5ID0gYXBpcy5hcHBfZ2V0V2luZG93SGllcmFjaHkoKTtcbiAgY29uc3QgZG9jID0gbmV3IGRvbSgpLnBhcnNlRnJvbVN0cmluZyh3aW5IaWVyYWNoeSk7XG4gIGxldCB4cGF0aCA9IGAvLypbQHBpZD1cIiR7cGlkfVwiIGFuZCBAd2lkPVwiJHt3aWR9XCIgYW5kIEBJbnB1dE91dHB1dD1cInRydWVcIiBhbmQgKEBuYW1lPVwiJHtuYW1lfVwiIG9yIGNvbnRhaW5zKGNvbmNhdChcIiBcIiwgQGNsYXNzLCBcIiBcIiksIFwiJHtcIiBcIiArIG5hbWUgKyBcIiBcIn1cIikpXWA7XG4gIGNvbnN0IG5vZGVzID0gc2VsZWN0KGRvYywgeHBhdGgpO1xuICBpZiAobm9kZXMgJiYgbm9kZXMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHRyeSB7XG4gICAgY29uc3Qgd2luID0gdGhpcy5fZ2V0V2luQW5kUGlkX0Zyb21XaW5JZCh3aWQpO1xuICAgIHRoaXMuX3dpbiA9IHdpbjtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5jb21tYW5kcy5maW5kRWxPckVscyA9IGFzeW5jIGZ1bmN0aW9uIGZpbmRFbE9yRWxzIChzdHJhdGVneSwgc2VsZWN0b3IsIG11bHQsIGNvbnRleHQpIHtcbiAgbGV0IGExMXlIaWVyYWNoeSA9IG51bGw7XG4gIGlmICghY29udGV4dCkge1xuICAgIGFwaXMuYTExeV9jbGVhcl9jYWNoZSgpO1xuICAgIGlmICghdGhpcy5fdmFsaWRhdGVPclVwZGF0ZVdpbkluZm8oKSkge1xuICAgICAgdGhyb3cgbmV3IGVycm9ycy5Ob1N1Y2hXaW5kb3dFcnJvcihgdGhlIHNlbGVjdGVkIHdpbmRvdyBkb2Vzbid0IGV4aXN0YCk7XG4gICAgfVxuICAgIGNvbnN0IHtwaWQsIG5hbWV9ID0gdGhpcy5fd2luO1xuICAgIGExMXlIaWVyYWNoeSA9IGFwaXMuYTExeV9nZXRXaW5kb3dVaUhpZXJhY2h5KG5hbWUsIHBpZCk7XG4gIH0gZWxzZSB7XG4gICAgYTExeUhpZXJhY2h5ID0gdGhpcy5fY2FjaGUuZ2V0KGNvbnRleHQpO1xuICAgIGlmICghYTExeUhpZXJhY2h5KSB7XG4gICAgICB0aHJvdyBuZXcgZXJyb3JzLlVua25vd25FcnJvcihgY29udGV4dCAke2NvbnRleHR9IGhhcyBleHBpcmVkYCk7XG4gICAgfVxuICB9XG4gIGNvbnN0IGRvYyA9IG5ldyBkb20oKS5wYXJzZUZyb21TdHJpbmcoYTExeUhpZXJhY2h5KTtcbiAgXG4gIGxldCB4cGF0aCA9IG51bGw7XG4gIGlmIChzdHJhdGVneSA9PSAnbmFtZScpIHtcbiAgICB4cGF0aCA9IGAvLypbQG5hbWU9XCIke3NlbGVjdG9yfVwiXWA7XG4gIH0gZWxzZSBpZiAoc3RyYXRlZ3kgPT0gJ2NsYXNzIG5hbWUnKSB7XG4gICAgeHBhdGggPSBgLy8qW2NvbnRhaW5zKGNvbmNhdChcIiBcIiwgQGNsYXNzLCBcIiBcIiksIFwiJHtcIiBcIiArIHNlbGVjdG9yICsgXCIgXCJ9XCIpXWBcbiAgfSBlbHNlIGlmIChzdHJhdGVneSA9PSAneHBhdGgnKSB7XG4gICAgeHBhdGggPSBzZWxlY3RvcjtcbiAgfSBlbHNlIHtcbiAgICB4cGF0aCA9IHNlbGVjdG9yO1xuICB9XG5cbiAgbGV0IG5vZGVzID0gc2VsZWN0KGRvYywgeHBhdGgpO1xuICBpZiAoIW5vZGVzIHx8IG5vZGVzLmxlbmd0aCA9PT0gMCkge1xuICAgIG5vZGVzID0gW107XG4gIH1cbiAgY29uc3Qgc2VyaWFsaXplciA9IG5ldyBYTUxTZXJpYWxpemVyKCk7XG4gIGlmIChtdWx0KSB7XG4gICAgbGV0IGVsZW1lbnRzID0gW107XG4gICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICBjb25zdCBzdHIgPSBzZXJpYWxpemVyLnNlcmlhbGl6ZVRvU3RyaW5nKG5vZGUpO1xuICAgICAgY29uc3Qga2V5ID0gdXVpZHY0KCk7XG4gICAgICB0aGlzLl9jYWNoZS5zZXQoa2V5LCBzdHIpO1xuICAgICAgZWxlbWVudHMucHVzaCh7XG4gICAgICAgIFwiZWxlbWVudC02MDY2LTExZTQtYTUyZS00ZjczNTQ2NmNlY2ZcIjoga2V5LFxuICAgICAgICBcIkVMRU1FTlRcIjoga2V5XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnRzO1xuICB9IGVsc2Uge1xuICAgIGlmIChub2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBlcnJvcnMuTm9TdWNoRWxlbWVudEVycm9yKCk7XG4gICAgfVxuICAgIGNvbnN0IG5vZGUgPSBub2Rlc1swXTtcbiAgICBjb25zdCBzdHIgPSBzZXJpYWxpemVyLnNlcmlhbGl6ZVRvU3RyaW5nKG5vZGUpO1xuICAgIGNvbnN0IGtleSA9IHV1aWR2NCgpO1xuICAgIHRoaXMuX2NhY2hlLnNldChrZXksIHN0cik7XG4gICAgcmV0dXJuIHtcbiAgICAgIFwiZWxlbWVudC02MDY2LTExZTQtYTUyZS00ZjczNTQ2NmNlY2ZcIjoga2V5LFxuICAgICAgXCJFTEVNRU5UXCI6IGtleVxuICAgIH07XG4gIH1cbn07XG5cblxuZXhwb3J0IHsgY29tbWFuZHMgfTtcbmV4cG9ydCBkZWZhdWx0IGNvbW1hbmRzO1xuIl0sImZpbGUiOiJsaWIvY29tbWFuZHMvZmluZC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLiJ9
