import AtSpi2Driver from './lib/driver';
import { startServer } from './lib/server';
import { asyncify } from 'asyncbox';

const DEFAULT_HOST = 'localhost';
const DEFAULT_PORT = 5898;

async function main () {
  const getArgValue = (argName) => {
    const argIndex = process.argv.indexOf(argName);
    return argIndex > 0 ? process.argv[argIndex + 1] : null;
  };
  const port = parseInt(getArgValue('--port'), 10) || DEFAULT_PORT;
  const host = getArgValue('--host') || DEFAULT_HOST;
  return await startServer(port, host);
}

if (require.main === module) {
  asyncify(main);
}

export default AtSpi2Driver;
export { AtSpi2Driver, startServer };
