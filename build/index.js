"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AtSpi2Driver", {
  enumerable: true,
  get: function () {
    return _driver.default;
  }
});
exports.default = void 0;
Object.defineProperty(exports, "startServer", {
  enumerable: true,
  get: function () {
    return _server.startServer;
  }
});

require("source-map-support/register");

var _driver = _interopRequireDefault(require("./lib/driver"));

var _server = require("./lib/server");

var _asyncbox = require("asyncbox");

const DEFAULT_HOST = 'localhost';
const DEFAULT_PORT = 5898;

async function main() {
  const getArgValue = argName => {
    const argIndex = process.argv.indexOf(argName);
    return argIndex > 0 ? process.argv[argIndex + 1] : null;
  };

  const port = parseInt(getArgValue('--port'), 10) || DEFAULT_PORT;
  const host = getArgValue('--host') || DEFAULT_HOST;
  return await (0, _server.startServer)(port, host);
}

if (require.main === module) {
  (0, _asyncbox.asyncify)(main);
}

var _default = _driver.default;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkRFRkFVTFRfSE9TVCIsIkRFRkFVTFRfUE9SVCIsIm1haW4iLCJnZXRBcmdWYWx1ZSIsImFyZ05hbWUiLCJhcmdJbmRleCIsInByb2Nlc3MiLCJhcmd2IiwiaW5kZXhPZiIsInBvcnQiLCJwYXJzZUludCIsImhvc3QiLCJyZXF1aXJlIiwibW9kdWxlIiwiQXRTcGkyRHJpdmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUVBLE1BQU1BLFlBQVksR0FBRyxXQUFyQjtBQUNBLE1BQU1DLFlBQVksR0FBRyxJQUFyQjs7QUFFQSxlQUFlQyxJQUFmLEdBQXVCO0FBQ3JCLFFBQU1DLFdBQVcsR0FBSUMsT0FBRCxJQUFhO0FBQy9CLFVBQU1DLFFBQVEsR0FBR0MsT0FBTyxDQUFDQyxJQUFSLENBQWFDLE9BQWIsQ0FBcUJKLE9BQXJCLENBQWpCO0FBQ0EsV0FBT0MsUUFBUSxHQUFHLENBQVgsR0FBZUMsT0FBTyxDQUFDQyxJQUFSLENBQWFGLFFBQVEsR0FBRyxDQUF4QixDQUFmLEdBQTRDLElBQW5EO0FBQ0QsR0FIRDs7QUFJQSxRQUFNSSxJQUFJLEdBQUdDLFFBQVEsQ0FBQ1AsV0FBVyxDQUFDLFFBQUQsQ0FBWixFQUF3QixFQUF4QixDQUFSLElBQXVDRixZQUFwRDtBQUNBLFFBQU1VLElBQUksR0FBR1IsV0FBVyxDQUFDLFFBQUQsQ0FBWCxJQUF5QkgsWUFBdEM7QUFDQSxTQUFPLE1BQU0seUJBQVlTLElBQVosRUFBa0JFLElBQWxCLENBQWI7QUFDRDs7QUFFRCxJQUFJQyxPQUFPLENBQUNWLElBQVIsS0FBaUJXLE1BQXJCLEVBQTZCO0FBQzNCLDBCQUFTWCxJQUFUO0FBQ0Q7O2VBRWNZLGUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXRTcGkyRHJpdmVyIGZyb20gJy4vbGliL2RyaXZlcic7XG5pbXBvcnQgeyBzdGFydFNlcnZlciB9IGZyb20gJy4vbGliL3NlcnZlcic7XG5pbXBvcnQgeyBhc3luY2lmeSB9IGZyb20gJ2FzeW5jYm94JztcblxuY29uc3QgREVGQVVMVF9IT1NUID0gJ2xvY2FsaG9zdCc7XG5jb25zdCBERUZBVUxUX1BPUlQgPSA1ODk4O1xuXG5hc3luYyBmdW5jdGlvbiBtYWluICgpIHtcbiAgY29uc3QgZ2V0QXJnVmFsdWUgPSAoYXJnTmFtZSkgPT4ge1xuICAgIGNvbnN0IGFyZ0luZGV4ID0gcHJvY2Vzcy5hcmd2LmluZGV4T2YoYXJnTmFtZSk7XG4gICAgcmV0dXJuIGFyZ0luZGV4ID4gMCA/IHByb2Nlc3MuYXJndlthcmdJbmRleCArIDFdIDogbnVsbDtcbiAgfTtcbiAgY29uc3QgcG9ydCA9IHBhcnNlSW50KGdldEFyZ1ZhbHVlKCctLXBvcnQnKSwgMTApIHx8IERFRkFVTFRfUE9SVDtcbiAgY29uc3QgaG9zdCA9IGdldEFyZ1ZhbHVlKCctLWhvc3QnKSB8fCBERUZBVUxUX0hPU1Q7XG4gIHJldHVybiBhd2FpdCBzdGFydFNlcnZlcihwb3J0LCBob3N0KTtcbn1cblxuaWYgKHJlcXVpcmUubWFpbiA9PT0gbW9kdWxlKSB7XG4gIGFzeW5jaWZ5KG1haW4pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBBdFNwaTJEcml2ZXI7XG5leHBvcnQgeyBBdFNwaTJEcml2ZXIsIHN0YXJ0U2VydmVyIH07XG4iXSwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlUm9vdCI6Ii4uIn0=
