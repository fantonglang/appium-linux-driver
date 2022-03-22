"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("source-map-support/register");

var _lodash = _interopRequireDefault(require("lodash"));

var _baseDriver = require("@appium/base-driver");

var _logger = _interopRequireDefault(require("../logger"));

const commands = {};
const EXTENSION_COMMANDS_MAPPING = {
  shell: 'shell'
};

commands.execute = async function execute(script, args) {
  if (script.match(/^linux:/)) {
    _logger.default.info(`Executing extension command '${script}'`);

    script = script.replace(/^linux:/, '').trim();
    return await this.executeLinuxCommand(script, _lodash.default.isArray(args) ? args[0] : args);
  }

  throw new _baseDriver.errors.NotImplementedError();
};

commands.executeLinuxCommand = async function executeLinuxCommand(command, opts = {}) {
  if (!_lodash.default.has(EXTENSION_COMMANDS_MAPPING, command)) {
    throw new _baseDriver.errors.UnknownCommandError(`Unknown extension command "${command}". ` + `Only ${_lodash.default.keys(EXTENSION_COMMANDS_MAPPING)} commands are supported.`);
  }

  return await this[EXTENSION_COMMANDS_MAPPING[command]](opts);
};

commands.shell = async function shell(cmd) {
  console.log('shell success');
};

var _default = commands;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9leGVjdXRlLmpzIl0sIm5hbWVzIjpbImNvbW1hbmRzIiwiRVhURU5TSU9OX0NPTU1BTkRTX01BUFBJTkciLCJzaGVsbCIsImV4ZWN1dGUiLCJzY3JpcHQiLCJhcmdzIiwibWF0Y2giLCJsb2ciLCJpbmZvIiwicmVwbGFjZSIsInRyaW0iLCJleGVjdXRlTGludXhDb21tYW5kIiwiXyIsImlzQXJyYXkiLCJlcnJvcnMiLCJOb3RJbXBsZW1lbnRlZEVycm9yIiwiY29tbWFuZCIsIm9wdHMiLCJoYXMiLCJVbmtub3duQ29tbWFuZEVycm9yIiwia2V5cyIsImNtZCIsImNvbnNvbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBRUEsTUFBTUEsUUFBUSxHQUFHLEVBQWpCO0FBRUEsTUFBTUMsMEJBQTBCLEdBQUc7QUFDakNDLEVBQUFBLEtBQUssRUFBRztBQUR5QixDQUFuQzs7QUFJQUYsUUFBUSxDQUFDRyxPQUFULEdBQW1CLGVBQWVBLE9BQWYsQ0FBd0JDLE1BQXhCLEVBQWdDQyxJQUFoQyxFQUFzQztBQUN2RCxNQUFJRCxNQUFNLENBQUNFLEtBQVAsQ0FBYSxTQUFiLENBQUosRUFBNkI7QUFDM0JDLG9CQUFJQyxJQUFKLENBQVUsZ0NBQStCSixNQUFPLEdBQWhEOztBQUNBQSxJQUFBQSxNQUFNLEdBQUdBLE1BQU0sQ0FBQ0ssT0FBUCxDQUFlLFNBQWYsRUFBMEIsRUFBMUIsRUFBOEJDLElBQTlCLEVBQVQ7QUFDQSxXQUFPLE1BQU0sS0FBS0MsbUJBQUwsQ0FBeUJQLE1BQXpCLEVBQWlDUSxnQkFBRUMsT0FBRixDQUFVUixJQUFWLElBQWtCQSxJQUFJLENBQUMsQ0FBRCxDQUF0QixHQUE0QkEsSUFBN0QsQ0FBYjtBQUNEOztBQUNELFFBQU0sSUFBSVMsbUJBQU9DLG1CQUFYLEVBQU47QUFDRCxDQVBEOztBQVNBZixRQUFRLENBQUNXLG1CQUFULEdBQStCLGVBQWVBLG1CQUFmLENBQW9DSyxPQUFwQyxFQUE2Q0MsSUFBSSxHQUFHLEVBQXBELEVBQXdEO0FBQ3JGLE1BQUksQ0FBQ0wsZ0JBQUVNLEdBQUYsQ0FBTWpCLDBCQUFOLEVBQWtDZSxPQUFsQyxDQUFMLEVBQWlEO0FBQy9DLFVBQU0sSUFBSUYsbUJBQU9LLG1CQUFYLENBQWdDLDhCQUE2QkgsT0FBUSxLQUF0QyxHQUNsQyxRQUFPSixnQkFBRVEsSUFBRixDQUFPbkIsMEJBQVAsQ0FBbUMsMEJBRHZDLENBQU47QUFFRDs7QUFDRCxTQUFPLE1BQU0sS0FBS0EsMEJBQTBCLENBQUNlLE9BQUQsQ0FBL0IsRUFBMENDLElBQTFDLENBQWI7QUFDRCxDQU5EOztBQVFBakIsUUFBUSxDQUFDRSxLQUFULEdBQWlCLGVBQWVBLEtBQWYsQ0FBc0JtQixHQUF0QixFQUEyQjtBQUMxQ0MsRUFBQUEsT0FBTyxDQUFDZixHQUFSLENBQVksZUFBWjtBQUNELENBRkQ7O2VBSWVQLFEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgZXJyb3JzIH0gZnJvbSAnQGFwcGl1bS9iYXNlLWRyaXZlcic7XG5pbXBvcnQgbG9nIGZyb20gJy4uL2xvZ2dlcic7XG5cbmNvbnN0IGNvbW1hbmRzID0ge307XG5cbmNvbnN0IEVYVEVOU0lPTl9DT01NQU5EU19NQVBQSU5HID0ge1xuICBzaGVsbDogICdzaGVsbCdcbn07XG5cbmNvbW1hbmRzLmV4ZWN1dGUgPSBhc3luYyBmdW5jdGlvbiBleGVjdXRlIChzY3JpcHQsIGFyZ3MpIHtcbiAgaWYgKHNjcmlwdC5tYXRjaCgvXmxpbnV4Oi8pKSB7XG4gICAgbG9nLmluZm8oYEV4ZWN1dGluZyBleHRlbnNpb24gY29tbWFuZCAnJHtzY3JpcHR9J2ApO1xuICAgIHNjcmlwdCA9IHNjcmlwdC5yZXBsYWNlKC9ebGludXg6LywgJycpLnRyaW0oKTtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5leGVjdXRlTGludXhDb21tYW5kKHNjcmlwdCwgXy5pc0FycmF5KGFyZ3MpID8gYXJnc1swXSA6IGFyZ3MpO1xuICB9XG4gIHRocm93IG5ldyBlcnJvcnMuTm90SW1wbGVtZW50ZWRFcnJvcigpO1xufTtcblxuY29tbWFuZHMuZXhlY3V0ZUxpbnV4Q29tbWFuZCA9IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVMaW51eENvbW1hbmQgKGNvbW1hbmQsIG9wdHMgPSB7fSkge1xuICBpZiAoIV8uaGFzKEVYVEVOU0lPTl9DT01NQU5EU19NQVBQSU5HLCBjb21tYW5kKSkge1xuICAgIHRocm93IG5ldyBlcnJvcnMuVW5rbm93bkNvbW1hbmRFcnJvcihgVW5rbm93biBleHRlbnNpb24gY29tbWFuZCBcIiR7Y29tbWFuZH1cIi4gYCArXG4gICAgICBgT25seSAke18ua2V5cyhFWFRFTlNJT05fQ09NTUFORFNfTUFQUElORyl9IGNvbW1hbmRzIGFyZSBzdXBwb3J0ZWQuYCk7XG4gIH1cbiAgcmV0dXJuIGF3YWl0IHRoaXNbRVhURU5TSU9OX0NPTU1BTkRTX01BUFBJTkdbY29tbWFuZF1dKG9wdHMpO1xufTtcblxuY29tbWFuZHMuc2hlbGwgPSBhc3luYyBmdW5jdGlvbiBzaGVsbCAoY21kKSB7XG4gIGNvbnNvbGUubG9nKCdzaGVsbCBzdWNjZXNzJyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb21tYW5kcztcbiJdLCJmaWxlIjoibGliL2NvbW1hbmRzL2V4ZWN1dGUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
