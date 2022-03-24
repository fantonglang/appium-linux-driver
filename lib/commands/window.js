import apis from '@stdspa/stdspalinux_temp/dist/privateapis';
import log from '../logger';
import select from 'xpath.js';
import { DOMParser as dom } from 'xmldom';
import { errors } from '@appium/base-driver';

const commands = {};

commands.getWindowHandle = function getWindowHandle () {
  return this._win?.wid;
};

commands.getWindowHandles = function getWindowHandles () {
  const appName = this.appName;
  const pids = apis.app_running(appName);
  if (!pids || pids.length === 0) {
    throw new errors.NoSuchWindowError(`application ${appName} is not running`);
  }
  const winHierachy = apis.app_getWindowHierachy();
  const doc = new dom().parseFromString(winHierachy);
  let xpath = pids.map(pid => `@pid="${pid}"`).join(" or ");
  xpath = `//*[${xpath} and @InputOutput="true"]`;
  const nodes = select(doc, xpath);
  if (!nodes || nodes.length == 0) {
    return [];
  }
  let _nodes = [];
  for (const node of nodes) {
    if (!node.attributes) {
      continue;
    }
    const _node = {};
    const attrs = Array.from(node.attributes);
    for (const attr of attrs) {
      if (attr.name == "class") {
        _node.class = attr.value.split(' ');
      } else if (attr.name == "name") {
        _node.name = attr.value;
      } else if (attr.name == "pid") {
        _node.pid = Number.parseInt(attr.value);
      } else if (attr.name == "wid") {
        _node.wid = Number.parseInt(attr.value);
      }
    }
    _nodes.push(_node);
  }
  _nodes = _nodes.filter(p => (p.class || p.name) && p.pid && p.wid);
  if (_nodes.length === 0) {
    return [];
  }
  _nodes = _nodes.map(p => {
    let _node = {pid: p.pid, wid: p.wid, names: []};
    if (p.name) {
      _node.names.push(p.name);
    }
    if (p.class) {
      _node.names.push(...p.class);
    }
    return _node;
  });
  const wids = [];
  for (const _node of _nodes) {
    let ok = false;
    for (const name of _node.names) {
      if (apis.a11y_checkWindowExists(name, _node.pid)) {
        ok = true;
        break;
      }
    }
    if (ok) {
      wids.push(_node.wid);
    }
  }
  return wids;
};

commands._getWinAndPid_FromWinName = function (windowName) {
  const pids = apis.app_running(this.appName);
  if (!pids || pids.length === 0) {
    throw new errors.NoSuchWindowError(`application ${this.appName} is not running`);
  }
  const winHierachy = apis.app_getWindowHierachy();
  const doc = new dom().parseFromString(winHierachy);
  let xpath = pids.map(pid => `@pid="${pid}"`).join(" or ");
  xpath = `//*[(${xpath}) and @InputOutput="true" and (@name="${windowName}" or contains(concat(" ", @class, " "), "${" " + windowName + " "}"))]`;
  const nodes = select(doc, xpath);
  if (!nodes || nodes.length == 0) {
    throw new errors.NoSuchWindowError(`the window ${windowName} doesn't present`);
  }
  let _nodes = [];
  for (const node of nodes) {
    if (!node.attributes) {
      continue;
    }
    const attrs = Array.from(node.attributes);
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
};

commands._getWinAndPid_FromWinId = function (wid) {
  const winHierachy = apis.app_getWindowHierachy();
  const doc = new dom().parseFromString(winHierachy);
  const xpath = `//*[@wid="${wid}" and @InputOutput="true"]`;
  const nodes = select(doc, xpath);
  if (!nodes || nodes.length == 0) {
    throw new errors.NoSuchWindowError(`the window wid=${wid} doesn't present`);
  }
  let node = nodes[0];
  const attrs = Array.from(node.attributes);
  const _node = {};
  for (const attr of attrs) {
    _node[attr.name] = attr.value;
  }
  node = _node;
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
};

function validateName(name) {
  if (!name) {
    return name;
  }
  for(let i=0; i<name.length; ++i) {
    if (name[i] < '0' || name[i] > '9') {
      return name;
    }
  }
  return null;
}

function validateHandle(handle) {
  if (!handle) {
    return handle;
  }
  for(let i=0; i<handle.length; ++i) {
    if (handle[i] < '0' || handle[i] > '9') {
      return null;
    }
  }
  return handle;
}

commands.setWindow = function setWindow (name, handle) {
  handle = validateHandle(handle);
  name = validateName(name);
  if (name) {
    const win = this._getWinAndPid_FromWinName(name);
    this._win = win;
  } else if (handle) {
    const win = this._getWinAndPid_FromWinId(handle);
    this._win = win;
  } else {
    throw new errors.UnknownError("setWindow both name and handle don't have a value");
  }
};

export default commands;