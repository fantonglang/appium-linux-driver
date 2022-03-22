"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wait4sec = wait4sec;

require("source-map-support/register");

function wait4sec(s) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, s * 1000);
  });
}require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi91dGlscy5qcyJdLCJuYW1lcyI6WyJ3YWl0NHNlYyIsInMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInNldFRpbWVvdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFPLFNBQVNBLFFBQVQsQ0FBa0JDLENBQWxCLEVBQXFCO0FBQzFCLFNBQU8sSUFBSUMsT0FBSixDQUFZQyxPQUFPLElBQUk7QUFDNUJDLElBQUFBLFVBQVUsQ0FBQyxNQUFNO0FBQ2ZELE1BQUFBLE9BQU87QUFDUixLQUZTLEVBRVBGLENBQUMsR0FBQyxJQUZLLENBQVY7QUFHRCxHQUpNLENBQVA7QUFLRCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiB3YWl0NHNlYyhzKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9LCBzKjEwMDApO1xuICB9KTtcbn0iXSwiZmlsZSI6ImxpYi91dGlscy5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLiJ9
