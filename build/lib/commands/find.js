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
  _privateapis.default.a11y_clear_cache();

  if (!this._validateOrUpdateWinInfo()) {
    throw new _baseDriver.errors.NoSuchWindowError(`the selected window doesn't exist`);
  }

  const {
    pid,
    name
  } = this._win;

  const a11yHierachy = _privateapis.default.a11y_getWindowUiHierachy(name, pid);

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

  if (mult) {
    return [{
      "element-6066-11e4-a52e-4f735466cecf": "00000000-0000-0004-0000-001300000012",
      "ELEMENT": "00000000-0000-0004-0000-001300000012"
    }];
  } else {
    return {
      "element-6066-11e4-a52e-4f735466cecf": "00000000-0000-0004-0000-001300000012",
      "ELEMENT": "00000000-0000-0004-0000-001300000012"
    };
  }
};

var _default = commands;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9maW5kLmpzIl0sIm5hbWVzIjpbImNvbW1hbmRzIiwiX3ZhbGlkYXRlT3JVcGRhdGVXaW5JbmZvIiwicGlkIiwid2lkIiwibmFtZSIsIl93aW4iLCJ3aW5IaWVyYWNoeSIsImFwaXMiLCJhcHBfZ2V0V2luZG93SGllcmFjaHkiLCJkb2MiLCJkb20iLCJwYXJzZUZyb21TdHJpbmciLCJ4cGF0aCIsIm5vZGVzIiwibGVuZ3RoIiwid2luIiwiX2dldFdpbkFuZFBpZF9Gcm9tV2luSWQiLCJmaW5kRWxPckVscyIsInN0cmF0ZWd5Iiwic2VsZWN0b3IiLCJtdWx0IiwiY29udGV4dCIsImExMXlfY2xlYXJfY2FjaGUiLCJlcnJvcnMiLCJOb1N1Y2hXaW5kb3dFcnJvciIsImExMXlIaWVyYWNoeSIsImExMXlfZ2V0V2luZG93VWlIaWVyYWNoeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQSxNQUFNQSxRQUFRLEdBQUcsRUFBakI7OztBQUVBQSxRQUFRLENBQUNDLHdCQUFULEdBQW9DLFlBQVc7QUFDN0MsUUFBTTtBQUFDQyxJQUFBQSxHQUFEO0FBQU1DLElBQUFBLEdBQU47QUFBV0MsSUFBQUE7QUFBWCxNQUFtQixLQUFLQyxJQUE5Qjs7QUFDQSxRQUFNQyxXQUFXLEdBQUdDLHFCQUFLQyxxQkFBTCxFQUFwQjs7QUFDQSxRQUFNQyxHQUFHLEdBQUcsSUFBSUMsaUJBQUosR0FBVUMsZUFBVixDQUEwQkwsV0FBMUIsQ0FBWjtBQUNBLE1BQUlNLEtBQUssR0FBSSxhQUFZVixHQUFJLGVBQWNDLEdBQUkseUNBQXdDQyxJQUFLLDRDQUEyQyxNQUFNQSxJQUFOLEdBQWEsR0FBSSxNQUF4SjtBQUNBLFFBQU1TLEtBQUssR0FBRyxvQkFBT0osR0FBUCxFQUFZRyxLQUFaLENBQWQ7O0FBQ0EsTUFBSUMsS0FBSyxJQUFJQSxLQUFLLENBQUNDLE1BQU4sR0FBZSxDQUE1QixFQUErQjtBQUM3QixXQUFPLElBQVA7QUFDRDs7QUFDRCxNQUFJO0FBQ0YsVUFBTUMsR0FBRyxHQUFHLEtBQUtDLHVCQUFMLENBQTZCYixHQUE3QixDQUFaOztBQUNBLFNBQUtFLElBQUwsR0FBWVUsR0FBWjtBQUNELEdBSEQsQ0FHRSxNQUFNO0FBQ04sV0FBTyxLQUFQO0FBQ0Q7O0FBQ0QsU0FBTyxJQUFQO0FBQ0QsQ0FoQkQ7O0FBbUJBZixRQUFRLENBQUNpQixXQUFULEdBQXVCLGVBQWVBLFdBQWYsQ0FBNEJDLFFBQTVCLEVBQXNDQyxRQUF0QyxFQUFnREMsSUFBaEQsRUFBc0RDLE9BQXRELEVBQStEO0FBQ3BGZCx1QkFBS2UsZ0JBQUw7O0FBQ0EsTUFBSSxDQUFDLEtBQUtyQix3QkFBTCxFQUFMLEVBQXNDO0FBQ3BDLFVBQU0sSUFBSXNCLG1CQUFPQyxpQkFBWCxDQUE4QixtQ0FBOUIsQ0FBTjtBQUNEOztBQUNELFFBQU07QUFBQ3RCLElBQUFBLEdBQUQ7QUFBTUUsSUFBQUE7QUFBTixNQUFjLEtBQUtDLElBQXpCOztBQUNBLFFBQU1vQixZQUFZLEdBQUdsQixxQkFBS21CLHdCQUFMLENBQThCdEIsSUFBOUIsRUFBb0NGLEdBQXBDLENBQXJCOztBQUNBLE1BQUlVLEtBQUssR0FBRyxJQUFaOztBQUNBLE1BQUlNLFFBQVEsSUFBSSxNQUFoQixFQUF3QjtBQUN0Qk4sSUFBQUEsS0FBSyxHQUFJLGNBQWFPLFFBQVMsSUFBL0I7QUFDRCxHQUZELE1BRU8sSUFBSUQsUUFBUSxJQUFJLFlBQWhCLEVBQThCO0FBQ25DTixJQUFBQSxLQUFLLEdBQUksMkNBQTBDLE1BQU1PLFFBQU4sR0FBaUIsR0FBSSxLQUF4RTtBQUNELEdBRk0sTUFFQSxJQUFJRCxRQUFRLElBQUksT0FBaEIsRUFBeUI7QUFDOUJOLElBQUFBLEtBQUssR0FBR08sUUFBUjtBQUNELEdBRk0sTUFFQTtBQUNMUCxJQUFBQSxLQUFLLEdBQUdPLFFBQVI7QUFDRDs7QUFDRCxNQUFJQyxJQUFKLEVBQVU7QUFDUixXQUFPLENBQUM7QUFDTiw2Q0FBdUMsc0NBRGpDO0FBRU4saUJBQVc7QUFGTCxLQUFELENBQVA7QUFJRCxHQUxELE1BS087QUFDTCxXQUFPO0FBQ0wsNkNBQXVDLHNDQURsQztBQUVMLGlCQUFXO0FBRk4sS0FBUDtBQUlEO0FBQ0YsQ0E1QkQ7O2VBZ0NlcEIsUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGVycm9ycyB9IGZyb20gJ0BhcHBpdW0vYmFzZS1kcml2ZXInO1xuaW1wb3J0IGFwaXMgZnJvbSAnQHN0ZHNwYS9zdGRzcGFsaW51eF90ZW1wL2Rpc3QvcHJpdmF0ZWFwaXMnO1xuaW1wb3J0IHNlbGVjdCBmcm9tICd4cGF0aC5qcyc7XG5pbXBvcnQgeyBET01QYXJzZXIgYXMgZG9tIH0gZnJvbSAneG1sZG9tJztcblxuY29uc3QgY29tbWFuZHMgPSB7fTtcblxuY29tbWFuZHMuX3ZhbGlkYXRlT3JVcGRhdGVXaW5JbmZvID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHtwaWQsIHdpZCwgbmFtZX0gPSB0aGlzLl93aW47XG4gIGNvbnN0IHdpbkhpZXJhY2h5ID0gYXBpcy5hcHBfZ2V0V2luZG93SGllcmFjaHkoKTtcbiAgY29uc3QgZG9jID0gbmV3IGRvbSgpLnBhcnNlRnJvbVN0cmluZyh3aW5IaWVyYWNoeSk7XG4gIGxldCB4cGF0aCA9IGAvLypbQHBpZD1cIiR7cGlkfVwiIGFuZCBAd2lkPVwiJHt3aWR9XCIgYW5kIEBJbnB1dE91dHB1dD1cInRydWVcIiBhbmQgKEBuYW1lPVwiJHtuYW1lfVwiIG9yIGNvbnRhaW5zKGNvbmNhdChcIiBcIiwgQGNsYXNzLCBcIiBcIiksIFwiJHtcIiBcIiArIG5hbWUgKyBcIiBcIn1cIikpXWA7XG4gIGNvbnN0IG5vZGVzID0gc2VsZWN0KGRvYywgeHBhdGgpO1xuICBpZiAobm9kZXMgJiYgbm9kZXMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHRyeSB7XG4gICAgY29uc3Qgd2luID0gdGhpcy5fZ2V0V2luQW5kUGlkX0Zyb21XaW5JZCh3aWQpO1xuICAgIHRoaXMuX3dpbiA9IHdpbjtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vLyBUaGlzIGlzIG5lZWRlZCB0byBtYWtlIGxvb2t1cCBieSBpbWFnZSB3b3JraW5nXG5jb21tYW5kcy5maW5kRWxPckVscyA9IGFzeW5jIGZ1bmN0aW9uIGZpbmRFbE9yRWxzIChzdHJhdGVneSwgc2VsZWN0b3IsIG11bHQsIGNvbnRleHQpIHtcbiAgYXBpcy5hMTF5X2NsZWFyX2NhY2hlKCk7XG4gIGlmICghdGhpcy5fdmFsaWRhdGVPclVwZGF0ZVdpbkluZm8oKSkge1xuICAgIHRocm93IG5ldyBlcnJvcnMuTm9TdWNoV2luZG93RXJyb3IoYHRoZSBzZWxlY3RlZCB3aW5kb3cgZG9lc24ndCBleGlzdGApO1xuICB9XG4gIGNvbnN0IHtwaWQsIG5hbWV9ID0gdGhpcy5fd2luO1xuICBjb25zdCBhMTF5SGllcmFjaHkgPSBhcGlzLmExMXlfZ2V0V2luZG93VWlIaWVyYWNoeShuYW1lLCBwaWQpO1xuICBsZXQgeHBhdGggPSBudWxsO1xuICBpZiAoc3RyYXRlZ3kgPT0gJ25hbWUnKSB7XG4gICAgeHBhdGggPSBgLy8qW0BuYW1lPVwiJHtzZWxlY3Rvcn1cIl1gO1xuICB9IGVsc2UgaWYgKHN0cmF0ZWd5ID09ICdjbGFzcyBuYW1lJykge1xuICAgIHhwYXRoID0gYC8vKltjb250YWlucyhjb25jYXQoXCIgXCIsIEBjbGFzcywgXCIgXCIpLCBcIiR7XCIgXCIgKyBzZWxlY3RvciArIFwiIFwifVwiKV1gXG4gIH0gZWxzZSBpZiAoc3RyYXRlZ3kgPT0gJ3hwYXRoJykge1xuICAgIHhwYXRoID0gc2VsZWN0b3I7XG4gIH0gZWxzZSB7XG4gICAgeHBhdGggPSBzZWxlY3RvcjtcbiAgfVxuICBpZiAobXVsdCkge1xuICAgIHJldHVybiBbe1xuICAgICAgXCJlbGVtZW50LTYwNjYtMTFlNC1hNTJlLTRmNzM1NDY2Y2VjZlwiOiBcIjAwMDAwMDAwLTAwMDAtMDAwNC0wMDAwLTAwMTMwMDAwMDAxMlwiLFxuICAgICAgXCJFTEVNRU5UXCI6IFwiMDAwMDAwMDAtMDAwMC0wMDA0LTAwMDAtMDAxMzAwMDAwMDEyXCJcbiAgICB9XTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgXCJlbGVtZW50LTYwNjYtMTFlNC1hNTJlLTRmNzM1NDY2Y2VjZlwiOiBcIjAwMDAwMDAwLTAwMDAtMDAwNC0wMDAwLTAwMTMwMDAwMDAxMlwiLFxuICAgICAgXCJFTEVNRU5UXCI6IFwiMDAwMDAwMDAtMDAwMC0wMDA0LTAwMDAtMDAxMzAwMDAwMDEyXCJcbiAgICB9O1xuICB9XG59O1xuXG5cbmV4cG9ydCB7IGNvbW1hbmRzIH07XG5leHBvcnQgZGVmYXVsdCBjb21tYW5kcztcbiJdLCJmaWxlIjoibGliL2NvbW1hbmRzL2ZpbmQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
