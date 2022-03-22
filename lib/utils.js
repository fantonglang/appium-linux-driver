export function wait4sec(s) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, s*1000);
  });
}