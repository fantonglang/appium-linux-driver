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

const commands = {};
exports.commands = commands;
Object.assign(commands, _execute.default, _appManagement.default, _find.default, _gestures.default, _screenshots.default);
var _default = commands;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9pbmRleC5qcyJdLCJuYW1lcyI6WyJjb21tYW5kcyIsIk9iamVjdCIsImFzc2lnbiIsImV4ZWN1dGVDbWRzIiwiYXBwTWFuYWdlbWVudENtZHMiLCJmaW5kIiwiZ2VzdHVyZXMiLCJzY3JlZW5zaG90cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQSxNQUFNQSxRQUFRLEdBQUcsRUFBakI7O0FBQ0FDLE1BQU0sQ0FBQ0MsTUFBUCxDQUNFRixRQURGLEVBRUVHLGdCQUZGLEVBR0VDLHNCQUhGLEVBSUVDLGFBSkYsRUFLRUMsaUJBTEYsRUFNRUMsb0JBTkY7ZUFVZVAsUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleGVjdXRlQ21kcyBmcm9tICcuL2V4ZWN1dGUnO1xuaW1wb3J0IGFwcE1hbmFnZW1lbnRDbWRzIGZyb20gJy4vYXBwLW1hbmFnZW1lbnQnO1xuaW1wb3J0IGZpbmQgZnJvbSAnLi9maW5kJztcbmltcG9ydCBnZXN0dXJlcyBmcm9tICcuL2dlc3R1cmVzJztcbmltcG9ydCBzY3JlZW5zaG90cyBmcm9tICcuL3NjcmVlbnNob3RzJztcblxuY29uc3QgY29tbWFuZHMgPSB7fTtcbk9iamVjdC5hc3NpZ24oXG4gIGNvbW1hbmRzLFxuICBleGVjdXRlQ21kcyxcbiAgYXBwTWFuYWdlbWVudENtZHMsXG4gIGZpbmQsXG4gIGdlc3R1cmVzLFxuICBzY3JlZW5zaG90c1xuKTtcblxuZXhwb3J0IHsgY29tbWFuZHMgfTtcbmV4cG9ydCBkZWZhdWx0IGNvbW1hbmRzO1xuIl0sImZpbGUiOiJsaWIvY29tbWFuZHMvaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
