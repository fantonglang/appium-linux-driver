import { util } from '@appium/support';
import { errors } from '@appium/base-driver';
import { DOMParser as dom } from 'xmldom';
import apis from '@stdspa/stdspalinux_temp/dist/privateapis';
import { wait4sec } from '../utils';

const commands = {};

commands._findElRect = function (uuid) {
  const strEl = this._cache.get(uuid);
  if (!strEl) {
    throw new errors.NoSuchElementError("the element doesn't exist");
  }
  const doc = new dom().parseFromString(strEl);
  if (!doc.documentElement.attributes) {
    throw new errors.InvalidElementCoordinatesError('the element has no rect attribute');
  }
  let attrs = Array.from(doc.documentElement.attributes);
  attrs = attrs.reduce((prev, curr) => {
    prev[curr.name] = curr.value;
    return prev;
  }, {});
  const rect = attrs.rect;
  if (!rect) {
    throw new errors.InvalidElementCoordinatesError('the element has no rect attribute');
  }
  const mat = /^\[(?<x>\d+),(?<y>\d+),(?<width>\d+),(?<height>\d+)\]$/.exec(rect);
  if (!mat) {
    throw new errors.InvalidElementCoordinatesError("the element's rect attribute is malformed");
  }
  const {x, y, width, height} = mat.groups;
  return {
    x: Number.parseInt(x, 10),
    y: Number.parseInt(y, 10),
    width: Number.parseInt(width, 10),
    height: Number.parseInt(height, 10)
  };
};

commands.setValue = commands.replaceValue = commands.setValueImmediate = async function setValue (values, elementId) {
  const uuid = elementId;
  const _v = values[0];
  const {x, y, width, height} = this._findElRect(uuid);
  const _x = x + width / 2;
  const _y = y + height / 2;
  await wait4sec(0.5);
  apis.mouse_click(_x, _y, 1);
  await wait4sec(0.5);
  apis.keyboard_tapKey('a', 4); // control + A
  await wait4sec(0.1);
  apis.keyboard_tapKeyCode(65535, 0); // delete
  await wait4sec(0.5);
  apis.keyboard_typeStringCopyPaste(_v);
  return null;
};

commands.click = async function click (elementId) {
  const uuid = elementId;
  const {x, y, width, height} = this._findElRect(uuid);
  const _x = x + width / 2;
  const _y = y + height / 2;
  await wait4sec(0.5);
  apis.mouse_click(_x, _y, 1);
  return null;
};

commands.pressKeyCode = function pressKeyCode (keycode, metastate) {
  metastate || (metastate = 0);
  if (keycode >= 0) {
    apis.keyboard_tapKeyCode(keycode, metastate);
  } else {
    apis.keyboard_tapKey(String.fromCharCode(-keycode), metastate);
  }

  return null;
};

commands.longPressKeyCode = async function longPressKeyCode (keycode, metastate) {
  metastate || (metastate = 0);
  const isKeyCode = keycode >= 0;
  if (isKeyCode) {
    apis.keyboard_toggleKeyCode(keycode, true, metastate);
    await wait4sec(0.5);
    apis.keyboard_toggleKeyCode(keycode, false, metastate);
  } else {
    apis.keyboard_toggleKey(String.fromCharCode(-keycode), true, metastate);
    await wait4sec(0.5);
    apis.keyboard_toggleKey(String.fromCharCode(-keycode), false, metastate);
  }

  return null;
};

commands.getProperty = commands.getAttribute = function getProperty (name, elementId) {
  const strEl = this._cache.get(elementId);
  if (!strEl) {
    throw new errors.NoSuchElementError("the element doesn't exist");
  }
  const doc = new dom().parseFromString(strEl);
  if (!doc.documentElement.attributes) {
    throw new errors.UnknownError('the element has no attributes');
  }
  let attrs = Array.from(doc.documentElement.attributes);
  attrs = attrs.reduce((prev, curr) => {
    prev[curr.name] = curr.value;
    return prev;
  }, {});
  return attrs[name];
};

commands.getElementRect = function getElementRect (elementId) {
  const rect = this.getProperty('rect', elementId);
  if (!rect) {
    throw new errors.InvalidElementCoordinatesError('the element has no rect attribute');
  }
  const mat = /^\[(?<x>\d+),(?<y>\d+),(?<width>\d+),(?<height>\d+)\]$/.exec(rect);
  if (!mat) {
    throw new errors.InvalidElementCoordinatesError("the element's rect attribute is malformed");
  }
  const {x, y, width, height} = mat.groups;
  return {
    x: Number.parseInt(x, 10),
    y: Number.parseInt(y, 10),
    width: Number.parseInt(width, 10),
    height: Number.parseInt(height, 10)
  };
};

commands.getSize = function getSize (elementId) {
  const rect = this.getElementRect(elementId);
  return {
    width: rect.width,
    height: rect.height
  };
};

commands.clear = async function clear (elementId) {
  await this.click(elementId);
  await wait4sec(0.5);
  apis.keyboard_tapKey('a', 4); // control + A
  await wait4sec(0.1);
  apis.keyboard_tapKeyCode(65535, 0); // delete
};

commands.getName = function getName (elementId) {
  const name = this.getProperty('name', elementId);
  return name;
};

commands.getText = function getText (elementId) {
  const text = this.getProperty('text', elementId);
  return text;
};

commands.linuxGetDisplaySize = function linuxGetDisplaySize () {
  return apis.c_getMainDisplaySize();
};

commands.linuxMouseMove = function linuxMouseMove (opts = {}) {
  const {x, y} = opts;
  const _x = Number.parseInt(x, 10);
  const _y = Number.parseInt(y, 10);
  if (!util.hasValue(_x) || !util.hasValue(_y)) {
    throw new errors.UnknownError('parameter x, y are required');
  }
  apis.mouse_move(_x, _y);
  return null;
};

commands.linuxMouseSwipe = function linuxMouseSwipe (opts = {}) {
  const {sx, sy, ex, ey} = opts;
  const _sx = Number.parseInt(sx, 10);
  const _sy = Number.parseInt(sy, 10);
  const _ex = Number.parseInt(ex, 10);
  const _ey = Number.parseInt(ey, 10);
  if (!util.hasValue(_sx) || !util.hasValue(_sy) || !util.hasValue(_ex) || !util.hasValue(_ey)) {
    throw new errors.UnknownError('parameter sx, sy, ex, ey are required');
  }
  apis.mouse_swipe(_sx, _sy, _ex, _ey);
  return null;
};

commands.linuxRightClick = function linuxRightClick (opts = {}) {
  const {elementId} = opts;
  if (!util.hasValue(elementId)) {
    throw new errors.UnknownError('parameter elementId is required');
  }
  const rect = this.getElementRect(elementId);
  const x = rect.x + rect.width / 2;
  const y = rect.y + rect.height / 2;
  apis.mouse_click(x, y, 3);
  return null;
};

commands.linuxDoubleClick = function linuxDoubleClick (opts = {}) {
  const {elementId} = opts;
  if (!util.hasValue(elementId)) {
    throw new errors.UnknownError('parameter elementId is required');
  }
  const rect = this.getElementRect(elementId);
  const x = rect.x + rect.width / 2;
  const y = rect.y + rect.height / 2;
  apis.mouse_doubleClick(x, y, 1);
  return null;
};

commands.linuxMouseScroll = function linuxMouseScroll (opts = {}) {
  const {moveLeftSteps, moveUpSteps} = opts;
  let _moveLeftSteps = Number.parseInt(moveLeftSteps, 10);
  let _moveUpSteps = Number.parseInt(moveUpSteps, 10);
  _moveLeftSteps = !_moveLeftSteps ? 0 : _moveLeftSteps;
  _moveUpSteps = !_moveUpSteps ? 0 : _moveUpSteps;
  if (_moveLeftSteps !== 0 || _moveUpSteps !== 0) {
    apis.mouse_scroll_x_y(_moveLeftSteps, _moveUpSteps);
  }
};

commands.linuxCopy = function linuxCopy (opts = {}) {
  const {str} = opts;
  if (!util.hasValue(str)) {
    throw new errors.UnknownError('parameter str is required');
  }
  apis.keyboard_copy(str);
};

commands.linuxGetClipboard = function linuxGetClipboard () {
  return apis.keyboard_getClipboardContent();
};

export default commands;
