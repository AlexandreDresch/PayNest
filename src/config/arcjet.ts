import arcjet, { shield, detectBot, tokenBucket } from '@arcjet/node';

import config from './config.js';

const aj = arcjet({
  key: config.arcjetKey,
  characteristics: ['ip.src'],
  rules: [
    shield({ mode: 'DRY_RUN' }),
    detectBot({
      mode: 'DRY_RUN',
      allow: ['CATEGORY:SEARCH_ENGINE'],
    }),
    tokenBucket({
      mode: 'DRY_RUN',
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});

export default aj;
