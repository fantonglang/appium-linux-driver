"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.executeCommand = executeCommand;
exports.wait4sec = wait4sec;

require("source-map-support/register");

var _child_process = require("child_process");

var _bluebird = require("bluebird");

function wait4sec(s) {
  return new _bluebird.Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, s * 1000);
  });
}

function executeCommand(cmd) {
  return new _bluebird.Promise((resolve, reject) => {
    (0, _child_process.exec)(cmd, (error, stdout, stderr) => {
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


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi91dGlscy5qcyJdLCJuYW1lcyI6WyJ3YWl0NHNlYyIsInMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInNldFRpbWVvdXQiLCJleGVjdXRlQ29tbWFuZCIsImNtZCIsInJlamVjdCIsImVycm9yIiwic3Rkb3V0Iiwic3RkZXJyIiwibXNnIiwicHVzaCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFTyxTQUFTQSxRQUFULENBQW1CQyxDQUFuQixFQUFzQjtBQUMzQixTQUFPLElBQUlDLGlCQUFKLENBQWFDLE9BQU8sSUFBSTtBQUM3QkMsSUFBQUEsVUFBVSxDQUFDLE1BQU07QUFDZkQsTUFBQUEsT0FBTztBQUNSLEtBRlMsRUFFUEYsQ0FBQyxHQUFHLElBRkcsQ0FBVjtBQUdELEdBSk0sQ0FBUDtBQUtEOztBQUVNLFNBQVNJLGNBQVQsQ0FBeUJDLEdBQXpCLEVBQThCO0FBQ25DLFNBQU8sSUFBSUosaUJBQUosQ0FBWSxDQUFDQyxPQUFELEVBQVVJLE1BQVYsS0FBcUI7QUFDdEMsNkJBQUtELEdBQUwsRUFBVSxDQUFDRSxLQUFELEVBQVFDLE1BQVIsRUFBZ0JDLE1BQWhCLEtBQTJCO0FBQ25DLFVBQUlGLEtBQUosRUFBVztBQUNURCxRQUFBQSxNQUFNLENBQUNDLEtBQUQsQ0FBTjtBQUNEOztBQUNELFVBQUlHLEdBQUcsR0FBRyxFQUFWOztBQUNBLFVBQUlELE1BQUosRUFBWTtBQUNWQyxRQUFBQSxHQUFHLENBQUNDLElBQUosQ0FBU0YsTUFBVDtBQUNEOztBQUNELFVBQUlELE1BQUosRUFBWTtBQUNWRSxRQUFBQSxHQUFHLENBQUNDLElBQUosQ0FBU0gsTUFBVDtBQUNEOztBQUNETixNQUFBQSxPQUFPLENBQUNRLEdBQUcsQ0FBQ0UsSUFBSixDQUFTLElBQVQsQ0FBRCxDQUFQO0FBQ0QsS0FaRDtBQWFELEdBZE0sQ0FBUDtBQWVEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhlYyB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gJ2JsdWViaXJkJztcblxuZXhwb3J0IGZ1bmN0aW9uIHdhaXQ0c2VjIChzKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSAocmVzb2x2ZSA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSwgcyAqIDEwMDApO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVDb21tYW5kIChjbWQpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBleGVjKGNtZCwgKGVycm9yLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9XG4gICAgICBsZXQgbXNnID0gW107XG4gICAgICBpZiAoc3RkZXJyKSB7XG4gICAgICAgIG1zZy5wdXNoKHN0ZGVycik7XG4gICAgICB9XG4gICAgICBpZiAoc3Rkb3V0KSB7XG4gICAgICAgIG1zZy5wdXNoKHN0ZG91dCk7XG4gICAgICB9XG4gICAgICByZXNvbHZlKG1zZy5qb2luKCdcXG4nKSk7XG4gICAgfSk7XG4gIH0pO1xufSJdLCJmaWxlIjoibGliL3V0aWxzLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uIn0=
