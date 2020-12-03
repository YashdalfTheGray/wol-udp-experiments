import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('SIGINT', () => {
  rl.close();
  process.exit();
});

const readLineConstantly = () => {
  rl.question('Mac address to include in the magic packet?\n', (mac) => {
    if (mac === 'exit') {
      rl.close();
      process.exit();
    }

    console.log(`The given MAC address was ${mac}`);
    readLineConstantly();
  });
};

readLineConstantly();
