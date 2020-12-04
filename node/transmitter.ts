import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('SIGINT', () => {
  rl.close();
  process.exit();
});

const isValidMacAddress = (mac: string) =>
  /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(mac);

const buildMagicPacket = (macAddress: string) =>
  Buffer.from(
    new Array(6)
      .fill(0xff)
      .concat(
        new Array(16)
          .fill(macAddress.split(/[:-]/).map((e) => parseInt(e, 16)))
          .flat()
      )
  );

const readLineConstantly = () => {
  rl.question('Mac address to include in the magic packet?\n', (mac) => {
    if (mac === 'exit') {
      rl.close();
      process.exit();
    }

    if (isValidMacAddress(mac)) {
      console.log(`The given MAC address was ${mac}`);
      console.log(buildMagicPacket(mac));
    } else {
      console.log('MAC address is not valid');
    }
    readLineConstantly();
  });
};

readLineConstantly();
