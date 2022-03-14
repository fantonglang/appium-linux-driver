"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.commands = void 0;

require("source-map-support/register");

var _execute = _interopRequireDefault(require("./execute"));

var _appManagement = _interopRequireDefault(require("./app-management"));

const commands = {};
exports.commands = commands;
Object.assign(commands, _execute.default, _appManagement.default);
var _default = commands;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9pbmRleC5qcyJdLCJuYW1lcyI6WyJjb21tYW5kcyIsIk9iamVjdCIsImFzc2lnbiIsImV4ZWN1dGVDbWRzIiwiYXBwTWFuYWdlbWVudENtZHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUEsTUFBTUEsUUFBUSxHQUFHLEVBQWpCOztBQUNBQyxNQUFNLENBQUNDLE1BQVAsQ0FDRUYsUUFERixFQUVFRyxnQkFGRixFQUdFQyxzQkFIRjtlQU9lSixRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4ZWN1dGVDbWRzIGZyb20gJy4vZXhlY3V0ZSc7XG5pbXBvcnQgYXBwTWFuYWdlbWVudENtZHMgZnJvbSAnLi9hcHAtbWFuYWdlbWVudCc7XG5cbmNvbnN0IGNvbW1hbmRzID0ge307XG5PYmplY3QuYXNzaWduKFxuICBjb21tYW5kcyxcbiAgZXhlY3V0ZUNtZHMsXG4gIGFwcE1hbmFnZW1lbnRDbWRzLFxuKTtcblxuZXhwb3J0IHsgY29tbWFuZHMgfTtcbmV4cG9ydCBkZWZhdWx0IGNvbW1hbmRzO1xuIl0sImZpbGUiOiJsaWIvY29tbWFuZHMvaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
