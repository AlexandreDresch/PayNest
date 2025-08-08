import app from './app.js';
import config from './config/config.js';
import connectToDatabase from './database/mongodb.js';

app.listen(config.port, async () => {
  console.log(`Server running on port ${config.port}`);

  await connectToDatabase();
});
