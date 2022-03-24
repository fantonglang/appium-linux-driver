const { exec } = require('child_process');

export function wait4sec(s) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, s*1000);
  });
}

export function executeCommand (cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      let msg = [];
      if (stderr) {
        msg.push(stderr);
      }
      if (stdout) {
        msg.push(stdout);
      }
      resolve(msg.join('\n'));
    });
  });
}