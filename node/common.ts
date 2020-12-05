import dotenv from 'dotenv';

export function readFromEnvironment() {
  dotenv.config();
  const { PORT, HOST } = process.env;
  if (PORT && HOST) {
    return { host: HOST, port: parseInt(PORT, 10) };
  } else {
    throw new Error(
      'The PORT and HOST environment variables should be defined.'
    );
  }
}
