import * as dgram from 'dgram';

import chalk from 'chalk';

const server = dgram.createSocket('udp4');

server.bind(8000, '127.0.0.1', () => {
  console.log(`Server started on ${chalk.green('127.0.0.1:8000')}`);
});

server.on('error', (err) => {
  console.error(err);
  server.close();
});
