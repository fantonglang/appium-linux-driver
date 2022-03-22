import _ from 'lodash';
import { errors } from '@appium/base-driver';
import log from '../logger';

const commands = {};

const EXTENSION_COMMANDS_MAPPING = {
  shell:  'shell'
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

commands.shell = async function shell (cmd) {
  console.log('shell success');
};

export default commands;
