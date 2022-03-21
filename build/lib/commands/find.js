"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.commands = void 0;

require("source-map-support/register");

var _baseDriver = require("@appium/base-driver");

const commands = {};
exports.commands = commands;

commands.findElOrEls = async function findElOrEls(strategy, selector, mult, context) {
  if (strategy != 'xpath') {
    throw new _baseDriver.errors.NotImplementedError();
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


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9maW5kLmpzIl0sIm5hbWVzIjpbImNvbW1hbmRzIiwiZmluZEVsT3JFbHMiLCJzdHJhdGVneSIsInNlbGVjdG9yIiwibXVsdCIsImNvbnRleHQiLCJlcnJvcnMiLCJOb3RJbXBsZW1lbnRlZEVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFFQSxNQUFNQSxRQUFRLEdBQUcsRUFBakI7OztBQUdBQSxRQUFRLENBQUNDLFdBQVQsR0FBdUIsZUFBZUEsV0FBZixDQUE0QkMsUUFBNUIsRUFBc0NDLFFBQXRDLEVBQWdEQyxJQUFoRCxFQUFzREMsT0FBdEQsRUFBK0Q7QUFDcEYsTUFBSUgsUUFBUSxJQUFJLE9BQWhCLEVBQXlCO0FBQ3ZCLFVBQU0sSUFBSUksbUJBQU9DLG1CQUFYLEVBQU47QUFDRDs7QUFDRCxNQUFJSCxJQUFKLEVBQVU7QUFDUixXQUFPLENBQUM7QUFDTiw2Q0FBdUMsc0NBRGpDO0FBRU4saUJBQVc7QUFGTCxLQUFELENBQVA7QUFJRCxHQUxELE1BS087QUFDTCxXQUFPO0FBQ0wsNkNBQXVDLHNDQURsQztBQUVMLGlCQUFXO0FBRk4sS0FBUDtBQUlEO0FBQ0YsQ0FmRDs7ZUFtQmVKLFEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBlcnJvcnMgfSBmcm9tICdAYXBwaXVtL2Jhc2UtZHJpdmVyJztcblxuY29uc3QgY29tbWFuZHMgPSB7fTtcblxuLy8gVGhpcyBpcyBuZWVkZWQgdG8gbWFrZSBsb29rdXAgYnkgaW1hZ2Ugd29ya2luZ1xuY29tbWFuZHMuZmluZEVsT3JFbHMgPSBhc3luYyBmdW5jdGlvbiBmaW5kRWxPckVscyAoc3RyYXRlZ3ksIHNlbGVjdG9yLCBtdWx0LCBjb250ZXh0KSB7XG4gIGlmIChzdHJhdGVneSAhPSAneHBhdGgnKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5Ob3RJbXBsZW1lbnRlZEVycm9yKCk7XG4gIH1cbiAgaWYgKG11bHQpIHtcbiAgICByZXR1cm4gW3tcbiAgICAgIFwiZWxlbWVudC02MDY2LTExZTQtYTUyZS00ZjczNTQ2NmNlY2ZcIjogXCIwMDAwMDAwMC0wMDAwLTAwMDQtMDAwMC0wMDEzMDAwMDAwMTJcIixcbiAgICAgIFwiRUxFTUVOVFwiOiBcIjAwMDAwMDAwLTAwMDAtMDAwNC0wMDAwLTAwMTMwMDAwMDAxMlwiXG4gICAgfV07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFwiZWxlbWVudC02MDY2LTExZTQtYTUyZS00ZjczNTQ2NmNlY2ZcIjogXCIwMDAwMDAwMC0wMDAwLTAwMDQtMDAwMC0wMDEzMDAwMDAwMTJcIixcbiAgICAgIFwiRUxFTUVOVFwiOiBcIjAwMDAwMDAwLTAwMDAtMDAwNC0wMDAwLTAwMTMwMDAwMDAxMlwiXG4gICAgfTtcbiAgfVxufTtcblxuXG5leHBvcnQgeyBjb21tYW5kcyB9O1xuZXhwb3J0IGRlZmF1bHQgY29tbWFuZHM7XG4iXSwiZmlsZSI6ImxpYi9jb21tYW5kcy9maW5kLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=
