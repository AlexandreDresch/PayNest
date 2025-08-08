import mongoose from 'mongoose';

import config from '../config/config.js';

if (!config.databaseUrl) {
  throw new Error('DATABASE_URL is not defined in the environment variables.');
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.databaseUrl);
    console.log(`Connected to MongoDB database successfully. Using ${config.nodeEnv} configuration.`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectToDatabase;
