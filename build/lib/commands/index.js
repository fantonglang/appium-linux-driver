"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.commands = void 0;

require("source-map-support/register");

var _execute = _interopRequireDefault(require("./execute"));

var _find = _interopRequireDefault(require("./find"));

var _gestures = _interopRequireDefault(require("./gestures"));

var _screenshots = _interopRequireDefault(require("./screenshots"));

var _source = _interopRequireDefault(require("./source"));

var _window = _interopRequireDefault(require("./window"));

const commands = {};
exports.commands = commands;
Object.assign(commands, _execute.default, _find.default, _gestures.default, _screenshots.default, _source.default, _window.default);
var _default = commands;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9pbmRleC5qcyJdLCJuYW1lcyI6WyJjb21tYW5kcyIsIk9iamVjdCIsImFzc2lnbiIsImV4ZWN1dGVDbWRzIiwiZmluZCIsImdlc3R1cmVzIiwic2NyZWVuc2hvdHMiLCJzb3VyY2UiLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUEsTUFBTUEsUUFBUSxHQUFHLEVBQWpCOztBQUNBQyxNQUFNLENBQUNDLE1BQVAsQ0FDRUYsUUFERixFQUVFRyxnQkFGRixFQUdFQyxhQUhGLEVBSUVDLGlCQUpGLEVBS0VDLG9CQUxGLEVBTUVDLGVBTkYsRUFPRUMsZUFQRjtlQVdlUixRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4ZWN1dGVDbWRzIGZyb20gJy4vZXhlY3V0ZSc7XG5pbXBvcnQgZmluZCBmcm9tICcuL2ZpbmQnO1xuaW1wb3J0IGdlc3R1cmVzIGZyb20gJy4vZ2VzdHVyZXMnO1xuaW1wb3J0IHNjcmVlbnNob3RzIGZyb20gJy4vc2NyZWVuc2hvdHMnO1xuaW1wb3J0IHNvdXJjZSBmcm9tICcuL3NvdXJjZSc7XG5pbXBvcnQgd2luZG93IGZyb20gJy4vd2luZG93JztcblxuY29uc3QgY29tbWFuZHMgPSB7fTtcbk9iamVjdC5hc3NpZ24oXG4gIGNvbW1hbmRzLFxuICBleGVjdXRlQ21kcyxcbiAgZmluZCxcbiAgZ2VzdHVyZXMsXG4gIHNjcmVlbnNob3RzLFxuICBzb3VyY2UsXG4gIHdpbmRvd1xuKTtcblxuZXhwb3J0IHsgY29tbWFuZHMgfTtcbmV4cG9ydCBkZWZhdWx0IGNvbW1hbmRzO1xuIl0sImZpbGUiOiJsaWIvY29tbWFuZHMvaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
