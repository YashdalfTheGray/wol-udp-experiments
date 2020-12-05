import * as dgram from 'dgram';
import * as readline from 'readline';

import { readFromEnvironment } from './common';

const { host, port } = readFromEnvironment();

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
      sock.send(buildMagicPacket(mac), port, host, (err) => {
        if (err) {
          console.log('Something went wrong');
          console.error(err);
          closeAndQuit(intf, sock);
        }
      });
    } else {
      console.log('MAC address is not valid');
    }
    readLineConstantly(intf, sock);
  });
};

const closeAndQuit = (intf: readline.Interface, sock: dgram.Socket) => {
  intf.close();
  sock.close();
  process.exit();
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('SIGINT', () => closeAndQuit(rl, tx));

const tx = dgram.createSocket('udp4');

readLineConstantly(rl, tx);
