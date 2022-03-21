import { errors } from '@appium/base-driver';

const commands = {};

// This is needed to make lookup by image working
commands.findElOrEls = async function findElOrEls (strategy, selector, mult, context) {
  if (strategy != 'xpath') {
    throw new errors.NotImplementedError();
  }
  if (mult) {
    return [{
      "element-6066-11e4-a52e-4f735466cecf": "00000000-0000-0004-0000-001300000012",
      "ELEMENT": "00000000-0000-0004-0000-001300000012"
    }];
  } else {
    return {
      "element-6066-11e4-a52e-4f735466cecf": "00000000-0000-0004-0000-001300000012",
      "ELEMENT": "00000000-0000-0004-0000-001300000012"
    };
  }
};


export { commands };
export default commands;
