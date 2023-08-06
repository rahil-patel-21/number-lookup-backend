import * as env from 'dotenv';

env.config();

export const EnvConfig = {
  personalSecrets: {
    email01: process.env.EMAIL_01,
    email01Pass: process.env.EMAIL_01_PASS,
  },
  network: {
    numLookupLogIn: process.env.NUM_LOOKUP_LOGIN ?? '',
  },
};
