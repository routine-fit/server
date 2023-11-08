import 'express-async-errors';
import dotenv from 'dotenv';

import app from './app';
import logger from './config/logger';

dotenv.config();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  logger.log({
    level: 'info',
    message: `⚡️ Server is running at http://localhost:${port} ✅`,
    label: 'server',
  });
});
