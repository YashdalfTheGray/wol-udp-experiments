import * as dgram from 'dgram';

import chalk from 'chalk';

import { readFromEnvironment } from './common';

const { host, port } = readFromEnvironment();

const server = dgram.createSocket('udp4');

server.bind(port, host, () => {
  console.log(`Server started on ${chalk.green(`${host}:${port}`)}`);
});

server.on('error', (err) => {
  console.error(err);
  server.close();
});

server.on('close', () => {
  console.log('\nsocket closed');
});

process.on('SIGINT', () => {
  server.close();
});
