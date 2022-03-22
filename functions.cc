#include "functions.h"
#include <stdio.h>
#include <dlfcn.h>
#include <stdlib.h>
#include <iostream>

struct HandleData
{
  Nan::Persistent<v8::BigInt> refObject;
  void * handle;
};

void cleanupHandle(const Nan::WeakCallbackInfo<HandleData> &info) {
  HandleData *data = info.GetParameter();
  if (data != nullptr) {
    dlclose(data->handle);
    delete data;
    printf("freeed\n");
  }
}

NAN_METHOD(c_getHandle) {
  void *handle = dlopen("/usr/local/lib/libstdspalinux.so", RTLD_LAZY);
	if(!handle)
	{
		printf("open lib error\n");
    printf(dlerror());
    printf("\n");
    info.GetReturnValue().SetNull();
    return;
	}
  
  v8::Local<v8::BigInt> retv = v8::BigInt::New(v8::Isolate::GetCurrent(), (uint64_t)handle);
  HandleData *data = new HandleData();
  data->handle = handle;
  data->refObject.Reset(retv);

  data->refObject.SetWeak(data, cleanupHandle, Nan::WeakCallbackType::kParameter);
  info.GetReturnValue().Set(retv);
}

extern "C" {
  struct CSize
  {
    int width;
    int height;
  };
  struct CPoint
	{
		int x;
		int y;
	};
}

static void* __getHandle(Nan::NAN_METHOD_ARGS_TYPE info) {
  v8::Local<v8::Context> context = info.GetIsolate()->GetCurrentContext(); 
  v8::Local<v8::BigInt> intval = info[0]->ToBigInt(context).ToLocalChecked(); 
  uint64_t handleval = intval->Uint64Value(); 
  void *handle = (void *)handleval; 
  return handle;
}

static int __getint(Nan::NAN_METHOD_ARGS_TYPE info, int i) {
  v8::Local<v8::Context> context = info.GetIsolate()->GetCurrentContext(); 
  return info[i]->Int32Value(context).FromJust();
}

static bool __getbool(Nan::NAN_METHOD_ARGS_TYPE info, int i) {
  return info[i]->BooleanValue(info.GetIsolate());
}

static const char* __getstr(Nan::NAN_METHOD_ARGS_TYPE info, int i) {
  v8::String::Utf8Value str(info.GetIsolate(), info[i]);
  return strdup(*str);
}

static double __getdouble(Nan::NAN_METHOD_ARGS_TYPE info, int i) {
  v8::Local<v8::Context> context = info.GetIsolate()->GetCurrentContext(); 
  return info[i]->NumberValue(context).FromJust();
}

typedef CSize (*c_getMainDisplaySize_t)();

NAN_METHOD(c_getMainDisplaySize) {
  void *handle = __getHandle(info);
  c_getMainDisplaySize_t c_getMainDisplaySize = (c_getMainDisplaySize_t) dlsym(handle, "c_getMainDisplaySize");
  CSize retv = c_getMainDisplaySize();
  v8::Local<v8::Object> obj = Nan::New<v8::Object>();
  Nan::Set(obj, Nan::New("width").ToLocalChecked(), v8::Integer::New(v8::Isolate::GetCurrent(), retv.width));
  Nan::Set(obj, Nan::New("height").ToLocalChecked(), v8::Integer::New(v8::Isolate::GetCurrent(), retv.height));
  info.GetReturnValue().Set(obj);
}

typedef void (*mouse_move_t)(int x, int y);

NAN_METHOD(mouse_move) {
  void *handle = __getHandle(info);
  mouse_move_t mouse_move = (mouse_move_t) dlsym(handle, "mouse_move");
  int x = __getint(info, 1);
  int y = __getint(info, 2);
  mouse_move(x, y);
  info.GetReturnValue().SetNull();
}

typedef void (*mouse_drag_t)(int x, int y);

NAN_METHOD(mouse_drag) {
  void *handle = __getHandle(info);
  mouse_drag_t mouse_drag = (mouse_drag_t) dlsym(handle, "mouse_drag");
  int x = __getint(info, 1);
  int y = __getint(info, 2);
  mouse_drag(x, y);
  info.GetReturnValue().SetNull();
}

typedef void (*mouse_swipe_t)(int sx, int sy, int ex, int ey);

NAN_METHOD(mouse_swipe) {
  void *handle = __getHandle(info);
  mouse_swipe_t mouse_swipe = (mouse_swipe_t) dlsym(handle, "mouse_swipe");
  int sx = __getint(info, 1);
  int sy = __getint(info, 2);
  int ex = __getint(info, 3);
  int ey = __getint(info, 4);
  mouse_swipe(sx, sy, ex, ey);
  info.GetReturnValue().SetNull();
}

typedef CPoint (*mouse_getPos_t)();

NAN_METHOD(mouse_getPos) {
  void *handle = __getHandle(info);
  mouse_getPos_t mouse_getPos = (mouse_getPos_t) dlsym(handle, "mouse_getPos");
  CPoint point = mouse_getPos();
  v8::Local<v8::Object> obj = Nan::New<v8::Object>();
  Nan::Set(obj, Nan::New("x").ToLocalChecked(), v8::Integer::New(v8::Isolate::GetCurrent(), point.x));
  Nan::Set(obj, Nan::New("y").ToLocalChecked(), v8::Integer::New(v8::Isolate::GetCurrent(), point.y));
  info.GetReturnValue().Set(obj);
}

typedef void (*mouse_click_t)(int x, int y, int button);

NAN_METHOD(mouse_click) {
  void *handle = __getHandle(info);
  mouse_click_t mouse_click = (mouse_click_t) dlsym(handle, "mouse_click");
  int x = __getint(info, 1);
  int y = __getint(info, 2);
  int button = __getint(info, 3);
  mouse_click(x, y, button);
  info.GetReturnValue().SetNull();
}

typedef void (*mouse_doubleClick_t)(int x, int y, int button);

NAN_METHOD(mouse_doubleClick) {
  void *handle = __getHandle(info);
  mouse_doubleClick_t mouse_doubleClick = (mouse_doubleClick_t) dlsym(handle, "mouse_doubleClick");
  int x = __getint(info, 1);
  int y = __getint(info, 2);
  int button = __getint(info, 3);
  mouse_doubleClick(x, y, button);
  info.GetReturnValue().SetNull();
}

typedef void (*mouse_scroll_t)(int scrollMagnitude, int scrollDirection);

NAN_METHOD(mouse_scroll) {
  void *handle = __getHandle(info);
  mouse_scroll_t mouse_scroll = (mouse_scroll_t) dlsym(handle, "mouse_scroll");
  int scrollMagnitude = __getint(info, 1);
  int scrollDirection = __getint(info, 2);
  mouse_scroll(scrollMagnitude, scrollDirection);
  info.GetReturnValue().SetNull();
}

typedef void (*mouse_scroll_x_y_t)(int x, int y);

NAN_METHOD(mouse_scroll_x_y) {
  void *handle = __getHandle(info);
  mouse_scroll_x_y_t mouse_scroll_x_y = (mouse_scroll_x_y_t) dlsym(handle, "mouse_scroll_x_y");
  int x = __getint(info, 1);
  int y = __getint(info, 2);
  mouse_scroll_x_y(x, y);
  info.GetReturnValue().SetNull();
}

typedef void (*mouse_smoothly_move_t)(int x, int y);

NAN_METHOD(mouse_smoothly_move) {
  void *handle = __getHandle(info);
  mouse_smoothly_move_t mouse_smoothly_move = (mouse_smoothly_move_t) dlsym(handle, "mouse_smoothly_move");
  int x = __getint(info, 1);
  int y = __getint(info, 2);
  mouse_smoothly_move(x, y);
  info.GetReturnValue().SetNull();
}

typedef void (*keyboard_toggleKeyCode_t)(int code, const bool down, int flags);

NAN_METHOD(keyboard_toggleKeyCode) {
  void *handle = __getHandle(info);
  keyboard_toggleKeyCode_t keyboard_toggleKeyCode = (keyboard_toggleKeyCode_t) dlsym(handle, "keyboard_toggleKeyCode");
  int code = __getint(info, 1);
  bool down = __getbool(info, 2);
  int flags = __getint(info, 3);
  keyboard_toggleKeyCode(code, down, flags);
  info.GetReturnValue().SetNull();
}

typedef void (*keyboard_tapKeyCode_t)(int code, int flags);

NAN_METHOD(keyboard_tapKeyCode) {
  void *handle = __getHandle(info);
  keyboard_tapKeyCode_t keyboard_tapKeyCode = (keyboard_tapKeyCode_t) dlsym(handle, "keyboard_tapKeyCode");
  int code = __getint(info, 1);
  int flags = __getint(info, 2);
  keyboard_tapKeyCode(code, flags);
  info.GetReturnValue().SetNull();
}

typedef void (*keyboard_toggleKey_t)(char c, const bool down, int flags);

NAN_METHOD(keyboard_toggleKey) {
  void *handle = __getHandle(info);
  keyboard_toggleKey_t keyboard_toggleKey = (keyboard_toggleKey_t) dlsym(handle, "keyboard_toggleKey");
  const char* _c = __getstr(info, 1);
  char c;
  if (strlen(_c) > 0) {
    c = _c[0];
  }
  bool down = __getbool(info, 2);
  int flags = __getint(info, 3);
  keyboard_toggleKey(c, down, flags);
  info.GetReturnValue().SetNull();
}

typedef void (*keyboard_tapKey_t)(char c, int flags);

NAN_METHOD(keyboard_tapKey) {
  void *handle = __getHandle(info);
  keyboard_tapKey_t keyboard_tapKey = (keyboard_tapKey_t) dlsym(handle, "keyboard_tapKey");
  const char* _c = __getstr(info, 1);
  char c;
  if (strlen(_c) > 0) {
    c = _c[0];
  }
  int flags = __getint(info, 2);
  keyboard_tapKey(c, flags);
  info.GetReturnValue().SetNull();
}

typedef void (*keyboard_typeString_t)(const char *str);

NAN_METHOD(keyboard_typeString) {
  void *handle = __getHandle(info);
  keyboard_typeString_t keyboard_typeString = (keyboard_typeString_t) dlsym(handle, "keyboard_typeString");
  const char* str = __getstr(info, 1);
  keyboard_typeString(str);
  info.GetReturnValue().SetNull();
}

typedef void (*keyboard_copy_t)(const char *str);

NAN_METHOD(keyboard_copy) {
  void *handle = __getHandle(info);
  keyboard_copy_t keyboard_copy = (keyboard_copy_t) dlsym(handle, "keyboard_copy");
  const char* str = __getstr(info, 1);
  keyboard_copy(str);
  info.GetReturnValue().SetNull();
}

typedef const char* (*keyboard_getClipboardContent_t)();

NAN_METHOD(keyboard_getClipboardContent) {
  void *handle = __getHandle(info);
  keyboard_getClipboardContent_t keyboard_getClipboardContent = (keyboard_getClipboardContent_t) dlsym(handle, "keyboard_getClipboardContent");
  const char * content = keyboard_getClipboardContent();
  info.GetReturnValue().Set(Nan::New(content).ToLocalChecked());
}

typedef void (*keyboard_typeStringCopyPaste_t)(const char *str);

NAN_METHOD(keyboard_typeStringCopyPaste) {
  void *handle = __getHandle(info);
  keyboard_typeStringCopyPaste_t keyboard_typeStringCopyPaste = (keyboard_typeStringCopyPaste_t) dlsym(handle, "keyboard_typeStringCopyPaste");
  const char* str = __getstr(info, 1);
  keyboard_typeStringCopyPaste(str);
  info.GetReturnValue().SetNull();
}

typedef void (*c_a11y_init_t)();

NAN_METHOD(c_a11y_init) {
  void *handle = __getHandle(info);
  c_a11y_init_t c_a11y_init = (c_a11y_init_t) dlsym(handle, "c_a11y_init");
  c_a11y_init();
  info.GetReturnValue().SetNull();
}

typedef const char* (*a11y_getDesktopUiHierachy_t)();

NAN_METHOD(a11y_getDesktopUiHierachy) {
  void *handle = __getHandle(info);
  a11y_getDesktopUiHierachy_t a11y_getDesktopUiHierachy = (a11y_getDesktopUiHierachy_t) dlsym(handle, "a11y_getDesktopUiHierachy");
  const char* retv = a11y_getDesktopUiHierachy();
  info.GetReturnValue().Set(Nan::New(retv).ToLocalChecked());
}

typedef bool (*a11y_checkWindowExists_t)(const char* windowName, int pid);

NAN_METHOD(a11y_checkWindowExists) {
  void *handle = __getHandle(info);
  a11y_checkWindowExists_t a11y_checkWindowExists = (a11y_checkWindowExists_t) dlsym(handle, "a11y_checkWindowExists");
  const char* windowName = __getstr(info, 1);
  int pid = __getint(info, 2);
  bool ok = a11y_checkWindowExists(windowName, pid);
  info.GetReturnValue().Set(ok);
}

typedef const char* (*a11y_getWindowUiHierachy_t)(const char* windowName, int pid);

NAN_METHOD(a11y_getWindowUiHierachy) {
  void *handle = __getHandle(info);
  a11y_getWindowUiHierachy_t a11y_getWindowUiHierachy = (a11y_getWindowUiHierachy_t) dlsym(handle, "a11y_getWindowUiHierachy");
  const char* windowName = __getstr(info, 1);
  int pid = __getint(info, 2);
  const char* hierachy = a11y_getWindowUiHierachy(windowName, pid);
  info.GetReturnValue().Set(Nan::New(hierachy).ToLocalChecked());
}

typedef const char* (*app_getWindowHierachy_t)();

NAN_METHOD(app_getWindowHierachy) {
  void *handle = __getHandle(info);
  app_getWindowHierachy_t app_getWindowHierachy = (app_getWindowHierachy_t) dlsym(handle, "app_getWindowHierachy");
  const char* hierachy = app_getWindowHierachy();
  info.GetReturnValue().Set(Nan::New(hierachy).ToLocalChecked());
}

typedef bool (*app_running_t)(const char* path, int* o_pids, int bufferSize, int* o_pids_count);

NAN_METHOD(app_running) {
  void *handle = __getHandle(info);
  app_running_t app_running = (app_running_t) dlsym(handle, "app_running");
  const char* path = __getstr(info, 1);

  int bufferSize = 50;
  while (true)
  {
    int _pids[bufferSize];
    int o_pids_count = 0;
    bool ok = app_running(path, _pids, bufferSize, &o_pids_count);
    if (!ok) {
      info.GetReturnValue().SetNull();
      return;
    }
    if (o_pids_count > bufferSize) {
      bufferSize = o_pids_count;
    } else {
      v8::Local<v8::Array> arr = Nan::New<v8::Array>(o_pids_count);
      for (int i=0; i<o_pids_count; ++i) {
        Nan::Set(arr, i, Nan::New(_pids[i]));
      }
      info.GetReturnValue().Set(arr);
      return;
    }
  }
}

typedef bool (*app_launch_t)(const char* path, int* errCode);

NAN_METHOD(app_launch) {
  void *handle = __getHandle(info);
  app_launch_t app_launch = (app_launch_t) dlsym(handle, "app_launch");
  const char* path = __getstr(info, 1);
  int errCode = 0;
  bool ok = app_launch(path, &errCode);
  v8::Local<v8::Object> obj = Nan::New<v8::Object>();
  Nan::Set(obj, Nan::New("ok").ToLocalChecked(), Nan::New(ok));
  if (ok) {
    Nan::Set(obj, Nan::New("errCode").ToLocalChecked(), Nan::New(0));
  } else {
    Nan::Set(obj, Nan::New("errCode").ToLocalChecked(), Nan::New(errCode));
  }
  info.GetReturnValue().Set(obj);
}

typedef void (*app_kill_t)(const char* path);

NAN_METHOD(app_kill) {
  void *handle = __getHandle(info);
  app_kill_t app_kill = (app_kill_t) dlsym(handle, "app_kill");
  const char* path = __getstr(info, 1);
  app_kill(path);
  info.GetReturnValue().SetNull();
}

typedef void (*win_raiseWindow_t)(long wid);

NAN_METHOD(win_raiseWindow) {
  void *handle = __getHandle(info);
  win_raiseWindow_t win_raiseWindow = (win_raiseWindow_t) dlsym(handle, "win_raiseWindow");
  int wid = __getint(info, 1);
  win_raiseWindow(wid);
  info.GetReturnValue().SetNull();
}

typedef void (*win_minimizeWindow_t)(long wid);

NAN_METHOD(win_minimizeWindow) {
  void *handle = __getHandle(info);
  win_minimizeWindow_t win_minimizeWindow = (win_minimizeWindow_t) dlsym(handle, "win_minimizeWindow");
  int wid = __getint(info, 1);
  win_minimizeWindow(wid);
  info.GetReturnValue().SetNull();
}

typedef void (*c_microsleep_t)(double milliseconds);

NAN_METHOD(c_microsleep) {
  void *handle = __getHandle(info);
  c_microsleep_t c_microsleep = (c_microsleep_t) dlsym(handle, "c_microsleep");
  double milliseconds = __getdouble(info, 1);
  c_microsleep(milliseconds);
  info.GetReturnValue().SetNull();
}

typedef bool (*c_winscreenshot_t)(long wid, const char* name);

NAN_METHOD(c_winscreenshot) {
  void *handle = __getHandle(info);
  c_winscreenshot_t c_winscreenshot = (c_winscreenshot_t) dlsym(handle, "c_winscreenshot");
  int wid = __getint(info, 1);
  const char* name = __getstr(info, 2);
  bool res = c_winscreenshot(wid, name);
  info.GetReturnValue().Set(res);
}

typedef const char* (*a11y_getPseudoWindowUiHierachy_t)(const char* descriptor);

NAN_METHOD(a11y_getPseudoWindowUiHierachy) {
  void *handle = __getHandle(info);
  a11y_getPseudoWindowUiHierachy_t a11y_getPseudoWindowUiHierachy = (a11y_getPseudoWindowUiHierachy_t) dlsym(handle, "a11y_getPseudoWindowUiHierachy");
  const char* descriptor = __getstr(info, 1);
  const char* hierachy = a11y_getPseudoWindowUiHierachy(descriptor);
  info.GetReturnValue().Set(Nan::New(hierachy).ToLocalChecked());
}