const window = {};

commands.getWindowHandle = async function getWindowHandle () {
  return this._windowId;
};

commands.window_handles = async function window_handles () {
  return [];
}

commands.setWindow = async function setWindow (opts = {}) {
  const {name, handle} = opts;
}

export default commands;