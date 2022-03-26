import _ from 'lodash';
import { errors } from '@appium/base-driver';
import log from '../logger';
import { executeCommand } from '../utils';
import { util } from '@appium/support';

const commands = {};

const EXTENSION_COMMANDS_MAPPING = {
  shell: 'shell',
  getDisplaySize: 'linuxGetDisplaySize',
  mouseMove: 'linuxMouseMove',
  mouseSwipe: 'linuxMouseSwipe',
  rightClick: 'linuxRightClick',
  doubleClick: 'linuxDoubleClick',
  mouseScroll: 'linuxMouseScroll',
  copy: 'linuxCopy',
  getClipboard: 'linuxGetClipboard'
};

commands.execute = async function execute (script, args) {
  if (script.match(/^linux:/)) {
    log.info(`Executing extension command '${script}'`);
    script = script.replace(/^linux:/, '').trim();
    return await this.executeLinuxCommand(script, _.isArray(args) ? args[0] : args);
  }
  throw new errors.NotImplementedError();
};

commands.executeLinuxCommand = async function executeLinuxCommand (command, opts = {}) {
  if (!_.has(EXTENSION_COMMANDS_MAPPING, command)) {
    throw new errors.UnknownCommandError(`Unknown extension command "${command}". ` +
      `Only ${_.keys(EXTENSION_COMMANDS_MAPPING)} commands are supported.`);
  }
  return await this[EXTENSION_COMMANDS_MAPPING[command]](opts);
};

commands.shell = async function shell (opts = {}) {
  const {cmd} = opts;
  if (!util.hasValue(cmd)) {
    throw new errors.UnknownError('parameter cmd is required');
  }
  try {
    const result = await executeCommand(cmd);
    return result;
  } catch (err) {
    throw new errors.UnknownError(err.message);
  }
};

export default commands;
