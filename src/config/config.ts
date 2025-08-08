import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  databaseUrl: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: `.env.${process.env.NODE_ENV || 'development'}.local`,
  databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/paynest',
};

export default config;
