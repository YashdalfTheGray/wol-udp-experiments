import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Mac address to include in the magic packet?', (mac) => {
  console.log(`The given MAC address was ${mac}`);
});

rl.on('SIGINT', () => {
  rl.close();
  process.exit();
});
