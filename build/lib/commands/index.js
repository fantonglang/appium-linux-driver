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

var _window = _interopRequireDefault(require("./window"));

const commands = {};
exports.commands = commands;
Object.assign(commands, _execute.default, _appManagement.default, _find.default, _gestures.default, _screenshots.default, _source.default, _window.default);
var _default = commands;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9pbmRleC5qcyJdLCJuYW1lcyI6WyJjb21tYW5kcyIsIk9iamVjdCIsImFzc2lnbiIsImV4ZWN1dGVDbWRzIiwiYXBwTWFuYWdlbWVudENtZHMiLCJmaW5kIiwiZ2VzdHVyZXMiLCJzY3JlZW5zaG90cyIsInNvdXJjZSIsIndpbmRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQSxNQUFNQSxRQUFRLEdBQUcsRUFBakI7O0FBQ0FDLE1BQU0sQ0FBQ0MsTUFBUCxDQUNFRixRQURGLEVBRUVHLGdCQUZGLEVBR0VDLHNCQUhGLEVBSUVDLGFBSkYsRUFLRUMsaUJBTEYsRUFNRUMsb0JBTkYsRUFPRUMsZUFQRixFQVFFQyxlQVJGO2VBWWVULFEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhlY3V0ZUNtZHMgZnJvbSAnLi9leGVjdXRlJztcbmltcG9ydCBhcHBNYW5hZ2VtZW50Q21kcyBmcm9tICcuL2FwcC1tYW5hZ2VtZW50JztcbmltcG9ydCBmaW5kIGZyb20gJy4vZmluZCc7XG5pbXBvcnQgZ2VzdHVyZXMgZnJvbSAnLi9nZXN0dXJlcyc7XG5pbXBvcnQgc2NyZWVuc2hvdHMgZnJvbSAnLi9zY3JlZW5zaG90cyc7XG5pbXBvcnQgc291cmNlIGZyb20gJy4vc291cmNlJztcbmltcG9ydCB3aW5kb3cgZnJvbSAnLi93aW5kb3cnO1xuXG5jb25zdCBjb21tYW5kcyA9IHt9O1xuT2JqZWN0LmFzc2lnbihcbiAgY29tbWFuZHMsXG4gIGV4ZWN1dGVDbWRzLFxuICBhcHBNYW5hZ2VtZW50Q21kcyxcbiAgZmluZCxcbiAgZ2VzdHVyZXMsXG4gIHNjcmVlbnNob3RzLFxuICBzb3VyY2UsXG4gIHdpbmRvd1xuKTtcblxuZXhwb3J0IHsgY29tbWFuZHMgfTtcbmV4cG9ydCBkZWZhdWx0IGNvbW1hbmRzO1xuIl0sImZpbGUiOiJsaWIvY29tbWFuZHMvaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
