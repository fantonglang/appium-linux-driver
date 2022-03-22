"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.commands = void 0;

require("source-map-support/register");

var _execute = _interopRequireDefault(require("./execute"));

var _appManagement = _interopRequireDefault(require("./app-management"));

var _find = _interopRequireDefault(require("./find"));

var _gestures = _interopRequireDefault(require("./gestures"));

var _screenshots = _interopRequireDefault(require("./screenshots"));

var _source = _interopRequireDefault(require("./source"));

const commands = {};
exports.commands = commands;
Object.assign(commands, _execute.default, _appManagement.default, _find.default, _gestures.default, _screenshots.default, _source.default);
var _default = commands;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9pbmRleC5qcyJdLCJuYW1lcyI6WyJjb21tYW5kcyIsIk9iamVjdCIsImFzc2lnbiIsImV4ZWN1dGVDbWRzIiwiYXBwTWFuYWdlbWVudENtZHMiLCJmaW5kIiwiZ2VzdHVyZXMiLCJzY3JlZW5zaG90cyIsInNvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQSxNQUFNQSxRQUFRLEdBQUcsRUFBakI7O0FBQ0FDLE1BQU0sQ0FBQ0MsTUFBUCxDQUNFRixRQURGLEVBRUVHLGdCQUZGLEVBR0VDLHNCQUhGLEVBSUVDLGFBSkYsRUFLRUMsaUJBTEYsRUFNRUMsb0JBTkYsRUFPRUMsZUFQRjtlQVdlUixRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4ZWN1dGVDbWRzIGZyb20gJy4vZXhlY3V0ZSc7XG5pbXBvcnQgYXBwTWFuYWdlbWVudENtZHMgZnJvbSAnLi9hcHAtbWFuYWdlbWVudCc7XG5pbXBvcnQgZmluZCBmcm9tICcuL2ZpbmQnO1xuaW1wb3J0IGdlc3R1cmVzIGZyb20gJy4vZ2VzdHVyZXMnO1xuaW1wb3J0IHNjcmVlbnNob3RzIGZyb20gJy4vc2NyZWVuc2hvdHMnO1xuaW1wb3J0IHNvdXJjZSBmcm9tICcuL3NvdXJjZSc7XG5cbmNvbnN0IGNvbW1hbmRzID0ge307XG5PYmplY3QuYXNzaWduKFxuICBjb21tYW5kcyxcbiAgZXhlY3V0ZUNtZHMsXG4gIGFwcE1hbmFnZW1lbnRDbWRzLFxuICBmaW5kLFxuICBnZXN0dXJlcyxcbiAgc2NyZWVuc2hvdHMsXG4gIHNvdXJjZVxuKTtcblxuZXhwb3J0IHsgY29tbWFuZHMgfTtcbmV4cG9ydCBkZWZhdWx0IGNvbW1hbmRzO1xuIl0sImZpbGUiOiJsaWIvY29tbWFuZHMvaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
