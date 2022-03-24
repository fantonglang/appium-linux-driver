import { errors } from '@appium/base-driver';
import apis from '@stdspa/stdspalinux_temp/dist/privateapis';

const commands = {};

commands.getPageSource = async function getPageSource (opts = {}) {
  apis.a11y_clear_cache();
  if (!this._validateOrUpdateWinInfo()) {
    throw new errors.NoSuchWindowError(`the selected window doesn't exist`);
  }
  const {pid, name} = this._win;
  return apis.a11y_getWindowUiHierachy(name, pid);
};

export default commands;
