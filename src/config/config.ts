import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

interface Config {
  port: number;
  serverUrl: string;
  nodeEnv: string;
  databaseUrl: string;
  jwtSecret: string;
  jwtExpiration: number;
  arcjetKey: string;
  arcjetEnv: string;
  qstashUrl: string;
  sqashToken: string;
  emailPassword: string;
  emailUser: string;
  appUrl: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  serverUrl: process.env.SERVER_URL || 'http://localhost:3000',
  nodeEnv: `.env.${process.env.NODE_ENV || 'development'}.local`,
  databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/paynest',
  jwtSecret: process.env.JWT_SECRET || 'defaultsecret',
  jwtExpiration: process.env.JWT_EXPIRATION
    ? Number(process.env.JWT_EXPIRATION)
    : 86400,
  arcjetKey: process.env.ARCJET_KEY || 'default_arcjet_key',
  arcjetEnv: process.env.ARCJET_ENV || 'development',
  qstashUrl: process.env.QSTASH_URL || 'https://qstash.upstash.io',
  sqashToken: process.env.QSTASH_TOKEN || 'default_qstash_token',
  emailPassword: process.env.EMAIL_PASSWORD || 'default_email_password',
  emailUser: process.env.EMAIL_USER || 'default_email_user',
  appUrl: process.env.APP_URL || 'http://localhost:3000',
};

export default config;
