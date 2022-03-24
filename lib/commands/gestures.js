import { util } from '@appium/support';
import { errors } from '@appium/base-driver';
import { util } from 'appium-support';
import select from 'xpath.js';
import { DOMParser as dom } from 'xmldom';
import apis from '@stdspa/stdspalinux_temp/dist/privateapis';
import { wait4sec } from '../utils';

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

commands._findElRect = function(uuid) {
  const strEl = this._cache.get(uuid);
  const doc = new dom().parseFromString(strEl);
  if (!doc.attributes) {
    throw new errors.UnknownError("the element has no rect attribute");
  }
  const attrs = Array.from(doc.attributes);
  const rect = attrs.find(p => p.name = 'rect')?.value;
  if (!rect) {
    throw new errors.UnknownError("the element has no rect attribute");
  }
  const mat = /^\[(?<x>\d+)\,(?<y>\d+)\,(?<width>\d+)\,(?<height>\d+)\]$/.exec(rect)
  if (!mat) {
    throw new errors.UnknownError("the element's rect attribute is malformed");
  }
  const {x, y, width, height} = mat.groups;
  return {
    x: Number.parseInt(x),
    y: Number.parseInt(y),
    width: Number.parseInt(width),
    height: Number.parseInt(height)
  };
};

commands.setValue = async function setValue (opts = {}) {
  const uuid = requireUuid(opts);
  const { value, text } = opts;
  const _v = util.hasValue(value)? value: util.hasValue(text)? text: null;
  const {x, y, width, height} = this._findElRect(uuid);
  const _x = x + width / 2;
  const _y = y + height / 2;
  await wait4sec(0.5);
  apis.mouse_click(_x, _y, 1);
  await wait4sec(0.5);
  apis.keyboard_typeStringCopyPaste(_v);
  return null;
};

commands.setValueImmediate = function setValueImmediate(opts = {}) {
  const uuid = requireUuid(opts);
  const { value, text } = opts;
  const _v = util.hasValue(value)? value: util.hasValue(text)? text: null;
  const {x, y, width, height} = this._findElRect(uuid);
  const _x = x + width / 2;
  const _y = y + height / 2;
  await wait4sec(0.5);
  apis.mouse_click(_x, _y, 1);
  await wait4sec(0.5);
  apis.keyboard_typeStringCopyPaste(_v);
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
