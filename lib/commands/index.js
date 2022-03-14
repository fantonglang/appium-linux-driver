import executeCmds from './execute';
import appManagementCmds from './app-management';

const commands = {};
Object.assign(
  commands,
  executeCmds,
  appManagementCmds,
);

export { commands };
export default commands;
