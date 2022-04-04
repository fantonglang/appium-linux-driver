import { execSync } from 'child_process';
import { Promise } from 'bluebird';

export function wait4sec (s) {
  return new Promise ((resolve) => {
    setTimeout(() => {
      resolve();
    }, s * 1000);
  });
}

export function executeCommand (cmd) {
  return new Promise((resolve, reject) => {
    try {
      const msg = execSync(cmd).toString('utf-8');
      resolve(msg);
    } catch (error) {
      reject(error);
    }
  });
}