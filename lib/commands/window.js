import apis from '@stdspa/stdspalinux_temp/dist/privateapis';
import log from '../logger';
import select from 'xpath.js';
import { DOMParser as dom } from 'xmldom';
import { errors } from '@appium/base-driver';

const commands = {};

commands.getWindowHandle = async function getWindowHandle () {
  return this._win?.wid;
};

commands.getWindowHandles = async function getWindowHandles () {
  const appName = this.appName;
  const pids = apis.app_running(appName);
  if (!pids || pids.length === 0) {
    throw new errors.NoSuchWindowError(`application ${appName} is not running`);
  }
  const winHierachy = apis.app_getWindowHierachy();
  const doc = new dom().parseFromString(winHierachy);
  let xpath = pids.map(pid => `@pid="${pid}"`).join(" or ");
  xpath = `//*[${xpath}]`;
  const nodes = select(doc, xpath);
  if (!nodes || nodes.length == 0) {
    return [];
  }
  const wids = [];
  for (const node of nodes) {
    const attrs = node.attributes;
    for (const attr of attrs) {
      if (attr.name == "wid") {
        wids.push(Number.parseInt(attr.value));
      }
    }
  }
  return wids;
}

commands._getWinAndPid_FromWinName = function (windowName) {
  const pids = apis.app_running(appName);
  if (!pids || pids.length === 0) {
    throw new errors.NoSuchWindowError(`application ${this.appName} is not running`);
  }
  const winHierachy = apis.app_getWindowHierachy();
  const doc = new dom().parseFromString(winHierachy);
  let xpath = pids.map(pid => `@pid="${pid}"`).join(" or ");
  xpath = `//*[(${xpath}) and (@name="${windowName}" or contains(concat(" ", @class, " "), "${" " + windowName + " "}"))]`;
  const nodes = select(doc, xpath);
  if (!nodes || nodes.length == 0) {
    throw new errors.NoSuchWindowError(`the window ${windowName} doesn't present`);
  }
  let _nodes = [];
  for (const node of nodes) {
    const attrs = node.attributes;
    const _node = {};
    for (const attr of attrs) {
      _node[attr.name] = attr.value;
    }
    _nodes.push(_node);
  }
  _nodes = _nodes.filter(p => (p.name || p.class) && p.pid && p.wid);
  if (_nodes.length == 0) {
    throw new errors.NoSuchWindowError(`the window ${windowName} doesn't present`);
  }
  _nodes.sort((a, b) => {
    const av = a.name == windowName? -1: 1;
    const bv = b.name == windowName? -1: 1;
    return av - bv;
  });
  for (const _node of _nodes) {
    const _pid = Number.parseInt(_node.pid);
    if (apis.a11y_checkWindowExists(windowName, _pid)) {
      return {
        pid: _pid,
        wid: Number.parseInt(_node.wid),
        name: windowName
      };
    }
  }
  throw new errors.NoSuchWindowError(`the window ${windowName} doesn't present`);
}

commands._getWinAndPid_FromWinId = function (wid) {
  const winHierachy = apis.app_getWindowHierachy();
  const doc = new dom().parseFromString(winHierachy);
  const xpath = `//*[@wid="${wid}"]`;
  const nodes = select(doc, xpath);
  if (!nodes || nodes.length == 0) {
    throw new errors.NoSuchWindowError(`the window wid=${wid} doesn't present`);
  }
  const node = nodes[0];
  if (!node.name || !node.pid || !node.wid) {
    throw new errors.NoSuchWindowError(`the window wid=${wid} doesn't present`);
  }
  if (!apis.a11y_checkWindowExists(node.name, Number.parseInt(node.pid))) {
    throw new errors.NoSuchWindowError(`the window wid=${wid} doesn't present`);
  }
  return {
    pid: Number.parseInt(node.pid),
    wid: Number.parseInt(node.wid),
    name: node.name
  };
}

commands.setWindow = function setWindow (opts = {}) {
  const {name, handle} = opts;
  if (name) {
    const win = this._getWinAndPid_FromWinName(name);
    this._win = win;
  } else if (handle) {
    const win = this._getWinAndPid_FromWinId(handle);
    this._win = win;
  } else {
    throw new errors.UnknownError("setWindow both name and handle don't have a value");
  }
}

export default commands;