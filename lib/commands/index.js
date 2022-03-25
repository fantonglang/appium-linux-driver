import executeCmds from './execute';
import find from './find';
import gestures from './gestures';
import screenshots from './screenshots';
import source from './source';
import window from './window';

const commands = {};
Object.assign(
  commands,
  executeCmds,
  find,
  gestures,
  screenshots,
  source,
  window
);

export { commands };
export default commands;
