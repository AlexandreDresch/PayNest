import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

interface Config {
  port: number;
  nodeEnv: string;
  databaseUrl: string;
  jwtSecret: string;
  jwtExpiration: number;
  arcjetKey: string;
  arcjetEnv: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: `.env.${process.env.NODE_ENV || 'development'}.local`,
  databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/paynest',
  jwtSecret: process.env.JWT_SECRET || 'defaultsecret',
  jwtExpiration: process.env.JWT_EXPIRATION
    ? Number(process.env.JWT_EXPIRATION)
    : 86400,
  arcjetKey: process.env.ARCJET_KEY || 'default_arcjet_key',
  arcjetEnv: process.env.ARCJET_ENV || 'development',
};

export default config;
