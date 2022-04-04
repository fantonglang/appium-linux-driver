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
    try {
      const msg = (0, _child_process.execSync)(cmd).toString('utf-8');
      resolve(msg);
    } catch (error) {
      reject(error);
    }
  });
}require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi91dGlscy5qcyJdLCJuYW1lcyI6WyJ3YWl0NHNlYyIsInMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInNldFRpbWVvdXQiLCJleGVjdXRlQ29tbWFuZCIsImNtZCIsInJlamVjdCIsIm1zZyIsInRvU3RyaW5nIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFTyxTQUFTQSxRQUFULENBQW1CQyxDQUFuQixFQUFzQjtBQUMzQixTQUFPLElBQUlDLGlCQUFKLENBQWNDLE9BQUQsSUFBYTtBQUMvQkMsSUFBQUEsVUFBVSxDQUFDLE1BQU07QUFDZkQsTUFBQUEsT0FBTztBQUNSLEtBRlMsRUFFUEYsQ0FBQyxHQUFHLElBRkcsQ0FBVjtBQUdELEdBSk0sQ0FBUDtBQUtEOztBQUVNLFNBQVNJLGNBQVQsQ0FBeUJDLEdBQXpCLEVBQThCO0FBQ25DLFNBQU8sSUFBSUosaUJBQUosQ0FBWSxDQUFDQyxPQUFELEVBQVVJLE1BQVYsS0FBcUI7QUFDdEMsUUFBSTtBQUNGLFlBQU1DLEdBQUcsR0FBRyw2QkFBU0YsR0FBVCxFQUFjRyxRQUFkLENBQXVCLE9BQXZCLENBQVo7QUFDQU4sTUFBQUEsT0FBTyxDQUFDSyxHQUFELENBQVA7QUFDRCxLQUhELENBR0UsT0FBT0UsS0FBUCxFQUFjO0FBQ2RILE1BQUFBLE1BQU0sQ0FBQ0csS0FBRCxDQUFOO0FBQ0Q7QUFDRixHQVBNLENBQVA7QUFRRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4ZWNTeW5jIH0gZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XG5pbXBvcnQgeyBQcm9taXNlIH0gZnJvbSAnYmx1ZWJpcmQnO1xuXG5leHBvcnQgZnVuY3Rpb24gd2FpdDRzZWMgKHMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlICgocmVzb2x2ZSkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0sIHMgKiAxMDAwKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlQ29tbWFuZCAoY21kKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG1zZyA9IGV4ZWNTeW5jKGNtZCkudG9TdHJpbmcoJ3V0Zi04Jyk7XG4gICAgICByZXNvbHZlKG1zZyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJlamVjdChlcnJvcik7XG4gICAgfVxuICB9KTtcbn0iXSwiZmlsZSI6ImxpYi91dGlscy5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLiJ9
