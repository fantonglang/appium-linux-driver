#ifndef NATIVE_EXTENSION_GRAB_H
#define NATIVE_EXTENSION_GRAB_H

#include <nan.h>

NAN_METHOD(c_getHandle);
NAN_METHOD(c_getMainDisplaySize);
NAN_METHOD(mouse_move);
NAN_METHOD(mouse_drag);
NAN_METHOD(mouse_swipe);
NAN_METHOD(mouse_getPos);
NAN_METHOD(mouse_click);
NAN_METHOD(mouse_doubleClick);
NAN_METHOD(mouse_scroll);
NAN_METHOD(mouse_scroll_x_y);
NAN_METHOD(mouse_smoothly_move);
NAN_METHOD(keyboard_toggleKeyCode);
NAN_METHOD(keyboard_tapKeyCode);
NAN_METHOD(keyboard_toggleKey);
NAN_METHOD(keyboard_tapKey);
NAN_METHOD(keyboard_typeString);
NAN_METHOD(keyboard_copy);
NAN_METHOD(keyboard_getClipboardContent);
NAN_METHOD(keyboard_typeStringCopyPaste);
NAN_METHOD(c_a11y_init);
NAN_METHOD(a11y_getDesktopUiHierachy);
NAN_METHOD(a11y_checkWindowExists);
NAN_METHOD(a11y_getWindowUiHierachy);
NAN_METHOD(app_getWindowHierachy);
NAN_METHOD(app_running);
NAN_METHOD(app_launch);
NAN_METHOD(app_kill);
NAN_METHOD(win_raiseWindow);
NAN_METHOD(win_minimizeWindow);
NAN_METHOD(c_microsleep);
NAN_METHOD(c_winscreenshot);
NAN_METHOD(a11y_getPseudoWindowUiHierachy);


#endif
