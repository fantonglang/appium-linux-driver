import { util } from '@appium/support';
import { errors } from '@appium/base-driver';

const commands = {};

function extractUuid (options = {}, keyNames = ['element-6066-11e4-a52e-4f735466cecf', 'element']) {
  for (const name of keyNames) {
    if (options[name]) {
      const result = util.unwrapElement(options[name]);
      if (result) {
        return result;
      }
    }
  }
  return null;
}

function requireUuid (options = {}, keyNames = ['element-6066-11e4-a52e-4f735466cecf', 'element']) {
  const result = extractUuid(options, keyNames);
  if (!result) {
    throw new errors.InvalidArgumentError(`${keyNames[0]} field is mandatory`);
  }
  return result;
}

commands.setValue = async function setValue (opts = {}) {
  const uuid = requireUuid(opts);
  const { value, text, keyModifierFlags } = opts;
  return null;
};

commands.click = async function click (opts = {}) {
  const uuid = extractUuid(opts);
  const { x, y, keyModifierFlags } = opts;
  return null;
};

commands.scroll = async function scroll (opts = {}) {
  const uuid = extractUuid(opts);
  const {
    x, y,
    deltaX, deltaY,
    keyModifierFlags,
  } = opts;
  return null;
};

commands.swipe = async function swipe (opts = {}) {
  const uuid = extractUuid(opts);
  const {
    x, y,
    direction,
    velocity,
    keyModifierFlags,
  } = opts;
  return null;
};

commands.rightClick = async function rightClick (opts = {}) {
  const uuid = extractUuid(opts);
  const { x, y, keyModifierFlags } = opts;
  return null;
};

commands.hover = async function hover (opts = {}) {
  const uuid = extractUuid(opts);
  const { x, y, keyModifierFlags } = opts;
  return null;
};

commands.doubleClick = async function doubleClick (opts = {}) {
  const uuid = extractUuid(opts);
  const { x, y, keyModifierFlags } = opts;
  return null;
};

commands.keys = async function keys (opts = {}) {
  const uuid = extractUuid(opts);
  const { keys } = opts;
  return null;
};

commands.pressKeyCode = async function pressKeyCode (opts = {}) {
  const uuid = extractUuid(opts);
  const { keycode, flags } = opts;
  return null;
}

commands.longPressKeyCode = async function longPressKeyCode (opts = {}) {
  const uuid = extractUuid(opts);
  const { keycode, flags } = opts;
  return null;
}

export default commands;
