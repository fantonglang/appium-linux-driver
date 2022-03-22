// export interface CSize {
//   width: number;
//   height: number;
// }

// export interface CPoint {
//   x: number;
//   y: number;
// }

// export interface Rect {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
// }

// export interface Bounds {
//   lx: number;
//   ly: number;
//   rx: number;
//   ry: number;
// }

// export interface LaunchResult {
//   ok: boolean;
//   errCode: number;
// }

// export enum MMMouseButton {
//   LEFT_BUTTON = 1,
//   CENTER_BUTTON = 2,
//   RIGHT_BUTTON = 3,
//   WheelDown =  4,
//   WheelUp  =  5,
//   WheelLeft =  6,
//   WheelRight = 7
// }

// export enum MMMouseWheelDirection {
//   DIRECTION_DOWN 	= -1,
//   DIRECTION_UP	= 1
// }

// export enum MMKeyCode {
//   K_NOT_A_KEY = 9999,
//   K_BACKSPACE = 65288,
//   K_DELETE = 65535,
//   K_RETURN = 65293,
//   K_TAB = 65289,
//   K_ESCAPE = 65307,
//   K_UP = 65362,
//   K_DOWN = 65364,
//   K_RIGHT = 65363,
//   K_LEFT = 65361,
//   K_HOME = 65360,
//   K_END = 65367,
//   K_PAGEUP = 65365,
//   K_PAGEDOWN = 65366,
//   K_F1 = 65470,
//   K_F2 = 65471,
//   K_F3 = 65472,
//   K_F4 = 65473,
//   K_F5 = 65474,
//   K_F6 = 65475,
//   K_F7 = 65476,
//   K_F8 = 65477,
//   K_F9 = 65478,
//   K_F10 = 65479,
//   K_F11 = 65480,
//   K_F12 = 65481,
//   K_F13 = 65482,
//   K_F14 = 65483,
//   K_F15 = 65484,
//   K_F16 = 65485,
//   K_F17 = 65486,
//   K_F18 = 65487,
//   K_F19 = 65488,
//   K_F20 = 65489,
//   K_F21 = 65490,
//   K_F22 = 65491,
//   K_F23 = 65492,
//   K_F24 = 65493,
//   K_META = 65515,
//   K_LMETA = 65515,
//   K_RMETA = 65516,
//   K_ALT = 65513,
//   K_LALT = 65513,
//   K_RALT = 65514,
//   K_CONTROL = 65507,
//   K_LCONTROL = 65507,
//   K_RCONTROL = 65508,
//   K_SHIFT = 65505,
//   K_LSHIFT = 65505,
//   K_RSHIFT = 65506,
//   K_CAPSLOCK = 65510,
//   K_SPACE = 32,
//   K_INSERT = 65379,
//   K_PRINTSCREEN = 65377,
//   K_MENU = 9999,
//   K_NUMPAD_0 = 65456,
//   K_NUMPAD_1 = 65457,
//   K_NUMPAD_2 = 65458,
//   K_NUMPAD_3 = 65459,
//   K_NUMPAD_4 = 65460,
//   K_NUMPAD_5 = 65461,
//   K_NUMPAD_6 = 65462,
//   K_NUMPAD_7 = 65463,
//   K_NUMPAD_8 = 65464,
//   K_NUMPAD_9 = 65465,
//   K_NUMPAD_LOCK = 65407,
//   K_NUMPAD_DECIMAL = 65454,
//   K_NUMPAD_PLUS = 78,
//   K_NUMPAD_MINUS = 74,
//   K_NUMPAD_MUL = 55,
//   K_NUMPAD_DIV = 98,
//   K_NUMPAD_CLEAR = 9999,
//   K_NUMPAD_ENTER = 96,
//   K_NUMPAD_EQUAL = 61,
//   K_AUDIO_VOLUME_MUTE = 269025042,
//   K_AUDIO_VOLUME_DOWN = 269025041,
//   K_AUDIO_VOLUME_UP = 269025043,
//   K_AUDIO_PLAY = 269025044,
//   K_AUDIO_STOP = 269025045,
//   K_AUDIO_PAUSE = 269025073,
//   K_AUDIO_PREV = 269025046,
//   K_AUDIO_NEXT = 269025047,
//   K_AUDIO_REWIND = 269025086,
//   K_AUDIO_FORWARD = 269025175,
//   K_AUDIO_REPEAT = 269025176,
//   K_AUDIO_RANDOM = 269025177,
//   K_LIGHTS_MON_UP = 269025026,
//   K_LIGHTS_MON_DOWN = 269025027,
//   K_LIGHTS_KBD_TOGGLE = 269025028,
//   K_LIGHTS_KBD_UP = 269025029,
//   K_LIGHTS_KBD_DOWN = 269025030
// }

// export enum MMKeyFlags {
//   MOD_NONE = 0,
//   MOD_META = 64,
//   MOD_ALT = 8,
//   MOD_CONTROL = 4,
//   MOD_SHIFT = 1
// }

// export enum ErrCodes {
//   ERR_LAUNCH_APP_WHILE_RUNNING = 1000,
//   ERR_LAUNCH_APP_WITH_WRONG_PATH = 1001,
//   ERR_LAUNCH_APP_TIMEOUT = 1002
// }

// export enum SwipeDir {
//   SWIPE_DIR_LEFT = 1,
//   SWIPE_DIR_RIGHT = 2,
//   SWIPE_DIR_UP = 3,
//   SWIPE_DIR_DOWN = 4
// }