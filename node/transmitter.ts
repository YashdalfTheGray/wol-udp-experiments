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
    console.log(JSON.stringify(buildMagicPacket(mac)));
    readLineConstantly();
  });
};

const buildMagicPacket = (macAddress: string) => {
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;

  return Buffer.from(
    new Array(6)
      .fill(0xff)
      .concat(new Array(16).fill(macAddress.split(/[:-]/)).flat())
  );
};

readLineConstantly();
