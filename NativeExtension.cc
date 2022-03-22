#include "functions.h"

using v8::FunctionTemplate;

// NativeExtension.cc represents the top level of the module.
// C++ constructs that are exposed to javascript are exported here

NAN_MODULE_INIT(InitAll) {
  Nan::Set(target, Nan::New("c_getHandle").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(c_getHandle)).ToLocalChecked());
  Nan::Set(target, Nan::New("c_getMainDisplaySize").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(c_getMainDisplaySize)).ToLocalChecked());
  Nan::Set(target, Nan::New("mouse_move").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(mouse_move)).ToLocalChecked());
  Nan::Set(target, Nan::New("mouse_drag").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(mouse_drag)).ToLocalChecked());
  Nan::Set(target, Nan::New("mouse_swipe").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(mouse_swipe)).ToLocalChecked());
  Nan::Set(target, Nan::New("mouse_getPos").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(mouse_getPos)).ToLocalChecked());
  Nan::Set(target, Nan::New("mouse_click").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(mouse_click)).ToLocalChecked());
  Nan::Set(target, Nan::New("mouse_doubleClick").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(mouse_doubleClick)).ToLocalChecked());
  Nan::Set(target, Nan::New("mouse_scroll").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(mouse_scroll)).ToLocalChecked());
  Nan::Set(target, Nan::New("mouse_scroll_x_y").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(mouse_scroll_x_y)).ToLocalChecked());
  Nan::Set(target, Nan::New("mouse_smoothly_move").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(mouse_smoothly_move)).ToLocalChecked());
  Nan::Set(target, Nan::New("keyboard_toggleKeyCode").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(keyboard_toggleKeyCode)).ToLocalChecked());
  Nan::Set(target, Nan::New("keyboard_tapKeyCode").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(keyboard_tapKeyCode)).ToLocalChecked());
  Nan::Set(target, Nan::New("keyboard_toggleKey").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(keyboard_toggleKey)).ToLocalChecked());
  Nan::Set(target, Nan::New("keyboard_tapKey").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(keyboard_tapKey)).ToLocalChecked());
  Nan::Set(target, Nan::New("keyboard_typeString").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(keyboard_typeString)).ToLocalChecked());
  Nan::Set(target, Nan::New("keyboard_copy").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(keyboard_copy)).ToLocalChecked());
  Nan::Set(target, Nan::New("keyboard_getClipboardContent").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(keyboard_getClipboardContent)).ToLocalChecked());
  Nan::Set(target, Nan::New("keyboard_typeStringCopyPaste").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(keyboard_typeStringCopyPaste)).ToLocalChecked());
  Nan::Set(target, Nan::New("c_a11y_init").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(c_a11y_init)).ToLocalChecked());
  Nan::Set(target, Nan::New("a11y_getDesktopUiHierachy").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(a11y_getDesktopUiHierachy)).ToLocalChecked());
  Nan::Set(target, Nan::New("a11y_checkWindowExists").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(a11y_checkWindowExists)).ToLocalChecked());
  Nan::Set(target, Nan::New("a11y_getWindowUiHierachy").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(a11y_getWindowUiHierachy)).ToLocalChecked());
  Nan::Set(target, Nan::New("app_getWindowHierachy").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(app_getWindowHierachy)).ToLocalChecked());
  Nan::Set(target, Nan::New("app_running").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(app_running)).ToLocalChecked());
  Nan::Set(target, Nan::New("app_launch").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(app_launch)).ToLocalChecked());
  Nan::Set(target, Nan::New("app_kill").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(app_kill)).ToLocalChecked());
  Nan::Set(target, Nan::New("win_raiseWindow").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(win_raiseWindow)).ToLocalChecked());
  Nan::Set(target, Nan::New("win_minimizeWindow").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(win_minimizeWindow)).ToLocalChecked());
  Nan::Set(target, Nan::New("c_microsleep").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(c_microsleep)).ToLocalChecked());
  Nan::Set(target, Nan::New("c_winscreenshot").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(c_winscreenshot)).ToLocalChecked());
  Nan::Set(target, Nan::New("a11y_getPseudoWindowUiHierachy").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(a11y_getPseudoWindowUiHierachy)).ToLocalChecked());
}

NODE_MODULE(NativeExtension, InitAll)
