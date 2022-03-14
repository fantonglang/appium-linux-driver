const commands = {};

commands.launchApp = async function launchApp (opts = {}) {
  const { appName } = opts;
  console.log(`launchApp ${appName}`);
};

commands.activateApp = async function activateApp (opts = {}) {
  const { appName } = opts;
  console.log(`activateApp ${appName}`);
};

commands.terminateApp = async function terminateApp (opts = {}) {
  const { appName } = opts;
  console.log(`terminateApp ${appName}`);
  return true;
};

const ApplicationState = {
  NotInstalled:           0,
  NotRunning:             1,
  IsRunningBgOrSuspended: 2,
  IsRunningBg:            3,
  IsRunningFg:            4
};

commands.queryAppState = async function queryAppState (opts = {}) {
  const { appName } = opts;
  console.log(`queryAppState ${appName}`);
  return ApplicationState.NotInstalled;
};

export default commands;