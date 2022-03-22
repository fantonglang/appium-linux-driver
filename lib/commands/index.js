import executeCmds from './execute';
import appManagementCmds from './app-management';
import find from './find';
import gestures from './gestures';
import screenshots from './screenshots';
import source from './source';

const commands = {};
Object.assign(
  commands,
  executeCmds,
  appManagementCmds,
  find,
  gestures,
  screenshots,
  source
);

export { commands };
export default commands;
