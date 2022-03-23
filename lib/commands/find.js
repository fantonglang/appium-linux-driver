import { errors } from '@appium/base-driver';
import apis from '@stdspa/stdspalinux_temp/dist/privateapis';
import select from 'xpath.js';
import { DOMParser as dom, XMLSerializer } from 'xmldom';
import { v4 as uuidv4 } from 'uuid';

const commands = {};

commands._validateOrUpdateWinInfo = function() {
  const {pid, wid, name} = this._win;
  const winHierachy = apis.app_getWindowHierachy();
  const doc = new dom().parseFromString(winHierachy);
  let xpath = `//*[@pid="${pid}" and @wid="${wid}" and @InputOutput="true" and (@name="${name}" or contains(concat(" ", @class, " "), "${" " + name + " "}"))]`;
  const nodes = select(doc, xpath);
  if (nodes && nodes.length > 0) {
    return true;
  }
  try {
    const win = this._getWinAndPid_FromWinId(wid);
    this._win = win;
  } catch {
    return false;
  }
  return true;
}

commands.findElOrEls = async function findElOrEls (strategy, selector, mult, context) {
  let a11yHierachy = null;
  if (!context) {
    apis.a11y_clear_cache();
    if (!this._validateOrUpdateWinInfo()) {
      throw new errors.NoSuchWindowError(`the selected window doesn't exist`);
    }
    const {pid, name} = this._win;
    a11yHierachy = apis.a11y_getWindowUiHierachy(name, pid);
  } else {
    a11yHierachy = this._cache.get(context);
    if (!a11yHierachy) {
      throw new errors.UnknownError(`context ${context} has expired`);
    }
  }
  const doc = new dom().parseFromString(a11yHierachy);
  
  let xpath = null;
  if (strategy == 'name') {
    xpath = `//*[@name="${selector}"]`;
  } else if (strategy == 'class name') {
    xpath = `//*[contains(concat(" ", @class, " "), "${" " + selector + " "}")]`
  } else if (strategy == 'xpath') {
    xpath = selector;
  } else {
    xpath = selector;
  }

  let nodes = select(doc, xpath);
  if (!nodes || nodes.length === 0) {
    nodes = [];
  }
  const serializer = new XMLSerializer();
  if (mult) {
    let elements = [];
    for (const node of nodes) {
      const str = serializer.serializeToString(node);
      const key = uuidv4();
      this._cache.set(key, str);
      elements.push({
        "element-6066-11e4-a52e-4f735466cecf": key,
        "ELEMENT": key
      });
    }
    return elements;
  } else {
    if (nodes.length === 0) {
      throw new errors.NoSuchElementError();
    }
    const node = nodes[0];
    const str = serializer.serializeToString(node);
    const key = uuidv4();
    this._cache.set(key, str);
    return {
      "element-6066-11e4-a52e-4f735466cecf": key,
      "ELEMENT": key
    };
  }
};


export { commands };
export default commands;
