"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("source-map-support/register");

var _lodash = _interopRequireDefault(require("lodash"));

var _baseDriver = require("@appium/base-driver");

var _desiredCaps = require("./desired-caps");

var _index = _interopRequireDefault(require("./commands/index"));

var _logger = _interopRequireDefault(require("./logger"));

const NO_PROXY = [];

class AtSpi2Driver extends _baseDriver.BaseDriver {
  constructor(opts = {}) {
    super(opts);
    this.desiredCapConstraints = _desiredCaps.desiredCapConstraints;
    this.locatorStrategies = ['xpath'];

    for (const [cmd, fn] of _lodash.default.toPairs(_index.default)) {
      console.log(`cmd - ${cmd}`);
      AtSpi2Driver.prototype[cmd] = fn;
    }
  }

  proxyActive() {
    return false;
  }

  getProxyAvoidList() {
    return NO_PROXY;
  }

  canProxy() {
    return false;
  }

  async createSession(...args) {
    const [sessionId, caps] = await super.createSession(...args);

    if (caps.appName) {
      this.appName = caps.appName;

      try {} catch (e) {
        _logger.default.error(e.message);
      }

      console.log(`app name is present: ${caps.appName}`);
    }

    return [sessionId, caps];
  }

  async deleteSession() {
    if (this.appName) {
      console.log(`session stop: ${this.appName} close`);
    }

    await super.deleteSession();
  }

}

var _default = AtSpi2Driver;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9kcml2ZXIuanMiXSwibmFtZXMiOlsiTk9fUFJPWFkiLCJBdFNwaTJEcml2ZXIiLCJCYXNlRHJpdmVyIiwiY29uc3RydWN0b3IiLCJvcHRzIiwiZGVzaXJlZENhcENvbnN0cmFpbnRzIiwibG9jYXRvclN0cmF0ZWdpZXMiLCJjbWQiLCJmbiIsIl8iLCJ0b1BhaXJzIiwiY29tbWFuZHMiLCJjb25zb2xlIiwibG9nIiwicHJvdG90eXBlIiwicHJveHlBY3RpdmUiLCJnZXRQcm94eUF2b2lkTGlzdCIsImNhblByb3h5IiwiY3JlYXRlU2Vzc2lvbiIsImFyZ3MiLCJzZXNzaW9uSWQiLCJjYXBzIiwiYXBwTmFtZSIsImUiLCJlcnJvciIsIm1lc3NhZ2UiLCJkZWxldGVTZXNzaW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBLE1BQU1BLFFBQVEsR0FBRyxFQUFqQjs7QUFFQSxNQUFNQyxZQUFOLFNBQTJCQyxzQkFBM0IsQ0FBc0M7QUFDcENDLEVBQUFBLFdBQVcsQ0FBRUMsSUFBSSxHQUFHLEVBQVQsRUFBYTtBQUN0QixVQUFNQSxJQUFOO0FBQ0EsU0FBS0MscUJBQUwsR0FBNkJBLGtDQUE3QjtBQUNBLFNBQUtDLGlCQUFMLEdBQXlCLENBQUMsT0FBRCxDQUF6Qjs7QUFDQSxTQUFLLE1BQU0sQ0FBQ0MsR0FBRCxFQUFNQyxFQUFOLENBQVgsSUFBd0JDLGdCQUFFQyxPQUFGLENBQVVDLGNBQVYsQ0FBeEIsRUFBNkM7QUFDM0NDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFhLFNBQVFOLEdBQUksRUFBekI7QUFDQU4sTUFBQUEsWUFBWSxDQUFDYSxTQUFiLENBQXVCUCxHQUF2QixJQUE4QkMsRUFBOUI7QUFDRDtBQUNGOztBQUVETyxFQUFBQSxXQUFXLEdBQUk7QUFDYixXQUFPLEtBQVA7QUFDRDs7QUFFREMsRUFBQUEsaUJBQWlCLEdBQUk7QUFDbkIsV0FBT2hCLFFBQVA7QUFDRDs7QUFFRGlCLEVBQUFBLFFBQVEsR0FBSTtBQUNWLFdBQU8sS0FBUDtBQUNEOztBQUVrQixRQUFiQyxhQUFhLENBQUUsR0FBR0MsSUFBTCxFQUFXO0FBQzVCLFVBQU0sQ0FBQ0MsU0FBRCxFQUFZQyxJQUFaLElBQW9CLE1BQU0sTUFBTUgsYUFBTixDQUFvQixHQUFHQyxJQUF2QixDQUFoQzs7QUFDQSxRQUFJRSxJQUFJLENBQUNDLE9BQVQsRUFBa0I7QUFDaEIsV0FBS0EsT0FBTCxHQUFlRCxJQUFJLENBQUNDLE9BQXBCOztBQUVBLFVBQUksQ0FFSCxDQUZELENBRUUsT0FBT0MsQ0FBUCxFQUFVO0FBQ1ZWLHdCQUFJVyxLQUFKLENBQVVELENBQUMsQ0FBQ0UsT0FBWjtBQUNEOztBQUNEYixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBYSx3QkFBdUJRLElBQUksQ0FBQ0MsT0FBUSxFQUFqRDtBQUNEOztBQUNELFdBQU8sQ0FBQ0YsU0FBRCxFQUFZQyxJQUFaLENBQVA7QUFDRDs7QUFFa0IsUUFBYkssYUFBYSxHQUFJO0FBQ3JCLFFBQUksS0FBS0osT0FBVCxFQUFrQjtBQUVoQlYsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQWEsaUJBQWdCLEtBQUtTLE9BQVEsUUFBMUM7QUFDRDs7QUFDRCxVQUFNLE1BQU1JLGFBQU4sRUFBTjtBQUNEOztBQTVDbUM7O2VBK0N2QnpCLFkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgQmFzZURyaXZlciB9IGZyb20gJ0BhcHBpdW0vYmFzZS1kcml2ZXInO1xuaW1wb3J0IHsgZGVzaXJlZENhcENvbnN0cmFpbnRzIH0gZnJvbSAnLi9kZXNpcmVkLWNhcHMnO1xuaW1wb3J0IGNvbW1hbmRzIGZyb20gJy4vY29tbWFuZHMvaW5kZXgnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlcic7XG5cbmNvbnN0IE5PX1BST1hZID0gW107XG5cbmNsYXNzIEF0U3BpMkRyaXZlciBleHRlbmRzIEJhc2VEcml2ZXIge1xuICBjb25zdHJ1Y3RvciAob3B0cyA9IHt9KSB7XG4gICAgc3VwZXIob3B0cyk7XG4gICAgdGhpcy5kZXNpcmVkQ2FwQ29uc3RyYWludHMgPSBkZXNpcmVkQ2FwQ29uc3RyYWludHM7XG4gICAgdGhpcy5sb2NhdG9yU3RyYXRlZ2llcyA9IFsneHBhdGgnXTtcbiAgICBmb3IgKGNvbnN0IFtjbWQsIGZuXSBvZiBfLnRvUGFpcnMoY29tbWFuZHMpKSB7XG4gICAgICBjb25zb2xlLmxvZyhgY21kIC0gJHtjbWR9YCk7XG4gICAgICBBdFNwaTJEcml2ZXIucHJvdG90eXBlW2NtZF0gPSBmbjtcbiAgICB9XG4gIH1cblxuICBwcm94eUFjdGl2ZSAoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0UHJveHlBdm9pZExpc3QgKCkge1xuICAgIHJldHVybiBOT19QUk9YWTtcbiAgfVxuXG4gIGNhblByb3h5ICgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhc3luYyBjcmVhdGVTZXNzaW9uICguLi5hcmdzKSB7XG4gICAgY29uc3QgW3Nlc3Npb25JZCwgY2Fwc10gPSBhd2FpdCBzdXBlci5jcmVhdGVTZXNzaW9uKC4uLmFyZ3MpO1xuICAgIGlmIChjYXBzLmFwcE5hbWUpIHtcbiAgICAgIHRoaXMuYXBwTmFtZSA9IGNhcHMuYXBwTmFtZTtcbiAgICAgIC8vIGF3YWl0IGtpbGxBcHAoY2Fwcy5hcHBOYW1lKVxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gYXdhaXQgc3RhcnRBcHAoY2Fwcy5hcHBOYW1lKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBsb2cuZXJyb3IoZS5tZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKGBhcHAgbmFtZSBpcyBwcmVzZW50OiAke2NhcHMuYXBwTmFtZX1gKTtcbiAgICB9XG4gICAgcmV0dXJuIFtzZXNzaW9uSWQsIGNhcHNdO1xuICB9XG5cbiAgYXN5bmMgZGVsZXRlU2Vzc2lvbiAoKSB7XG4gICAgaWYgKHRoaXMuYXBwTmFtZSkge1xuICAgICAgLy8gYXdhaXQga2lsbEFwcChjYXBzLmFwcE5hbWUpXG4gICAgICBjb25zb2xlLmxvZyhgc2Vzc2lvbiBzdG9wOiAke3RoaXMuYXBwTmFtZX0gY2xvc2VgKTtcbiAgICB9XG4gICAgYXdhaXQgc3VwZXIuZGVsZXRlU2Vzc2lvbigpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEF0U3BpMkRyaXZlcjsiXSwiZmlsZSI6ImxpYi9kcml2ZXIuanMiLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
