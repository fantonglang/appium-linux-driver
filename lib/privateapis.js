const NativeExtension = require('bindings')('NativeExtension');

class _PrivateApis {
  constructor() {
    this.handle = NativeExtension.c_getHandle()
  }
  c_getMainDisplaySize() {
    return NativeExtension.c_getMainDisplaySize(this.handle);
  }
  c_microsleep(milliseconds) {
    NativeExtension.c_microsleep(this.handle, milliseconds)
  }
  mouse_move(x, y) {
    x = Number.parseInt(x.toString());
    y = Number.parseInt(y.toString());
    NativeExtension.mouse_move(this.handle, x, y);
  }
  mouse_drag(x, y) {
    x = Number.parseInt(x.toString());
    y = Number.parseInt(y.toString());
    NativeExtension.mouse_drag(this.handle, x, y);
  }
  mouse_swipe(sx, sy, ex, ey) {
    sx = Number.parseInt(sx.toString());
    sy = Number.parseInt(sy.toString());
    ex = Number.parseInt(ex.toString());
    ey = Number.parseInt(ey.toString());
    NativeExtension.mouse_swipe(this.handle, sx, sy, ex, ey);
  }
  mouse_getPos() {
    return NativeExtension.mouse_getPos(this.handle);
  }
  mouse_click(x, y, button) {
    x = Number.parseInt(x.toString());
    y = Number.parseInt(y.toString());
    button = Number.parseInt(button.toString());
    NativeExtension.mouse_click(this.handle, x, y, button);
  }
  mouse_doubleClick(x, y, button) {
    x = Number.parseInt(x.toString());
    y = Number.parseInt(y.toString());
    button = Number.parseInt(button.toString());
    NativeExtension.mouse_doubleClick(this.handle, x, y, button);
  }
  mouse_scroll(scrollMagnitude, scrollDirection) {
    scrollMagnitude = Number.parseInt(scrollMagnitude.toString());
    scrollDirection = Number.parseInt(scrollDirection.toString());
    NativeExtension.mouse_scroll(this.handle, scrollMagnitude, scrollDirection)
  }
  mouse_scroll_x_y(x, y) {
    x = Number.parseInt(x.toString());
    y = Number.parseInt(y.toString());
    NativeExtension.mouse_scroll_x_y(this.handle, x, y);
  }
  mouse_smoothly_move(x, y) {
    x = Number.parseInt(x.toString());
    y = Number.parseInt(y.toString());
    NativeExtension.mouse_smoothly_move(this.handle, x, y);
  }
  keyboard_toggleKeyCode(code, down, flags) {
    code = Number.parseInt(code.toString());
    flags = Number.parseInt(flags.toString());
    NativeExtension.keyboard_toggleKeyCode(this.handle, code, down, flags);
  }
  keyboard_tapKeyCode(code, flags) {
    code = Number.parseInt(code.toString());
    flags = Number.parseInt(flags.toString());
    NativeExtension.keyboard_tapKeyCode(this.handle, code, flags);
  }
  keyboard_toggleKey(c, down, flags) {
    flags = Number.parseInt(flags.toString());
    NativeExtension.keyboard_toggleKey(this.handle, c, down, flags)
  }
  keyboard_tapKey(c, flags) {
    flags = Number.parseInt(flags.toString());
    NativeExtension.keyboard_tapKey(this.handle, c, flags);
  }
  keyboard_typeString(str) {
    NativeExtension.keyboard_typeString(this.handle, str);
  }
  keyboard_copy(str) {
    NativeExtension.keyboard_copy(this.handle, str);
  }
  keyboard_getClipboardContent() {
    return NativeExtension.keyboard_getClipboardContent(this.handle);
  }
  keyboard_typeStringCopyPaste(str) {
    NativeExtension.keyboard_typeStringCopyPaste(this.handle, str);
  }
  c_a11y_init() {
    NativeExtension.c_a11y_init(this.handle);
  }
  a11y_getDesktopUiHierachy() {
    return NativeExtension.a11y_getDesktopUiHierachy(this.handle);
  }
  a11y_checkWindowExists(windowName, pid) {
    pid = Number.parseInt(pid.toString());
    return NativeExtension.a11y_checkWindowExists(this.handle, windowName, pid);
  }
  a11y_getWindowUiHierachy(windowName, pid) {
    pid = Number.parseInt(pid.toString());
    return NativeExtension.a11y_getWindowUiHierachy(this.handle, windowName, pid);
  }
  app_getWindowHierachy() {
    return NativeExtension.app_getWindowHierachy(this.handle);
  }
  app_running(path) {
    return NativeExtension.app_running(this.handle, path);
  }
  app_launch(path) {
    return NativeExtension.app_launch(this.handle, path);
  }
  app_kill(path) {
    NativeExtension.app_kill(this.handle, path);
  }
  win_raiseWindow(wid) {
    wid = Number.parseInt(wid.toString());
    NativeExtension.win_raiseWindow(this.handle, wid);
  }
  win_minimizeWindow(wid) {
    wid = Number.parseInt(wid.toString());
    NativeExtension.win_minimizeWindow(this.handle, wid);
  }
  c_winscreenshot(wid, name) {
    wid = Number.parseInt(wid.toString());
    return NativeExtension.c_winscreenshot(this.handle, wid, name);
  }
  a11y_getPseudoWindowUiHierachy(descriptor) {
    const _descriptor = JSON.stringify(descriptor)
    return NativeExtension.a11y_getPseudoWindowUiHierachy(this.handle, _descriptor)
  }
}

const apis = new _PrivateApis();

export default apis;