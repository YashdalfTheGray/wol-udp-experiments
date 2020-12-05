import * as dgram from 'dgram';
import * as readline from 'readline';

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

const readLineConstantly = (intf: readline.Interface, sock: dgram.Socket) => {
  intf.question('Mac address to include in the magic packet?\n', (mac) => {
    if (mac === 'exit') {
      intf.close();
      process.exit();
    }

    if (isValidMacAddress(mac)) {
      console.log(`The given MAC address was ${mac}`);
      sock.send(buildMagicPacket(mac), 8000, 'localhost', (err) => {
        if (err) {
          console.log('Something went wrong');
          console.error(err);
        }
      });
    } else {
      console.log('MAC address is not valid');
    }
    readLineConstantly(intf, sock);
  });
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('SIGINT', () => {
  rl.close();
  transmitter.close();
  process.exit();
});

const transmitter = dgram.createSocket('udp4');

readLineConstantly(rl, transmitter);
