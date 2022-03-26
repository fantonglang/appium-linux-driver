import apis from '@stdspa/stdspalinux_temp/dist/privateapis';
import fs from 'fs';
import sharp from 'sharp';

const commands = {};

commands.getScreenshot = function () {
  if (!this._win) {
    return null;
  }
  const {wid} = this._win;
  if (apis.c_winscreenshot(Number.parseInt(wid, 10), 'appiumdriver')) {
    const content = fs.readFileSync('/tmp/.stdspa/appiumdriver.png', {encoding: 'base64'});
    return content;
  }
  return null;
};

commands.getElementScreenshot = async function (elementId) {
  if (!this._win) {
    return null;
  }
  const {wid} = this._win;
  const {x, y, width, height} = this._findElRect(elementId);
  const {x: winX, y: winY} = this.getWindowRect();
  if (apis.c_winscreenshot(Number.parseInt(wid, 10), 'appiumdriver')) {
    const data = await sharp('/tmp/.stdspa/appiumdriver.png')
      .extract({left: x - winX, top: y - winY, width, height})
      .png()
      .toBuffer();
    return data.toString('base64');
  }
  return null;
};

export default commands;
