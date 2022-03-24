"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.executeCommand = executeCommand;
exports.wait4sec = wait4sec;

require("source-map-support/register");

const {
  exec
} = require('child_process');

function wait4sec(s) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, s * 1000);
  });
}

function executeCommand(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }

      let msg = [];

      if (stderr) {
        msg.push(stderr);
      }

      if (stdout) {
        msg.push(stdout);
      }

      resolve(msg.join('\n'));
    });
  });
}require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi91dGlscy5qcyJdLCJuYW1lcyI6WyJleGVjIiwicmVxdWlyZSIsIndhaXQ0c2VjIiwicyIsIlByb21pc2UiLCJyZXNvbHZlIiwic2V0VGltZW91dCIsImV4ZWN1dGVDb21tYW5kIiwiY21kIiwicmVqZWN0IiwiZXJyb3IiLCJzdGRvdXQiLCJzdGRlcnIiLCJtc2ciLCJwdXNoIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE1BQU07QUFBRUEsRUFBQUE7QUFBRixJQUFXQyxPQUFPLENBQUMsZUFBRCxDQUF4Qjs7QUFFTyxTQUFTQyxRQUFULENBQWtCQyxDQUFsQixFQUFxQjtBQUMxQixTQUFPLElBQUlDLE9BQUosQ0FBWUMsT0FBTyxJQUFJO0FBQzVCQyxJQUFBQSxVQUFVLENBQUMsTUFBTTtBQUNmRCxNQUFBQSxPQUFPO0FBQ1IsS0FGUyxFQUVQRixDQUFDLEdBQUMsSUFGSyxDQUFWO0FBR0QsR0FKTSxDQUFQO0FBS0Q7O0FBRU0sU0FBU0ksY0FBVCxDQUF5QkMsR0FBekIsRUFBOEI7QUFDbkMsU0FBTyxJQUFJSixPQUFKLENBQVksQ0FBQ0MsT0FBRCxFQUFVSSxNQUFWLEtBQXFCO0FBQ3RDVCxJQUFBQSxJQUFJLENBQUNRLEdBQUQsRUFBTSxDQUFDRSxLQUFELEVBQVFDLE1BQVIsRUFBZ0JDLE1BQWhCLEtBQTJCO0FBQ25DLFVBQUlGLEtBQUosRUFBVztBQUNURCxRQUFBQSxNQUFNLENBQUNDLEtBQUQsQ0FBTjtBQUNEOztBQUNELFVBQUlHLEdBQUcsR0FBRyxFQUFWOztBQUNBLFVBQUlELE1BQUosRUFBWTtBQUNWQyxRQUFBQSxHQUFHLENBQUNDLElBQUosQ0FBU0YsTUFBVDtBQUNEOztBQUNELFVBQUlELE1BQUosRUFBWTtBQUNWRSxRQUFBQSxHQUFHLENBQUNDLElBQUosQ0FBU0gsTUFBVDtBQUNEOztBQUNETixNQUFBQSxPQUFPLENBQUNRLEdBQUcsQ0FBQ0UsSUFBSixDQUFTLElBQVQsQ0FBRCxDQUFQO0FBQ0QsS0FaRyxDQUFKO0FBYUQsR0FkTSxDQUFQO0FBZUQiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGV4ZWMgfSA9IHJlcXVpcmUoJ2NoaWxkX3Byb2Nlc3MnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHdhaXQ0c2VjKHMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0sIHMqMTAwMCk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZUNvbW1hbmQgKGNtZCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGV4ZWMoY21kLCAoZXJyb3IsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH1cbiAgICAgIGxldCBtc2cgPSBbXTtcbiAgICAgIGlmIChzdGRlcnIpIHtcbiAgICAgICAgbXNnLnB1c2goc3RkZXJyKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdGRvdXQpIHtcbiAgICAgICAgbXNnLnB1c2goc3Rkb3V0KTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUobXNnLmpvaW4oJ1xcbicpKTtcbiAgICB9KTtcbiAgfSk7XG59Il0sImZpbGUiOiJsaWIvdXRpbHMuanMiLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
