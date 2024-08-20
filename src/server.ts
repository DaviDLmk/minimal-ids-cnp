import express from 'express';
import negotiationsRouter from './routes/negotiations.router';
import { APIError } from './classes/APIError.class';
import { env } from './config';
import { RouteNotFoundError } from './classes/RouteNotFoundError';
import mongoose from 'mongoose';

const app = express();

export const startServer = async (port?: number) => {
  await mongoose.connect(env.DATABASE_URL);

  app.get('/health', (_, res) => {
    const uptime = process.uptime();
    res.status(200).json({ message: 'Server is running', uptime });
  });

  app.use('/negotiations', negotiationsRouter);

  /**
   * Catch unknown routes
   */
  app.use((req, res, next) => {
    throw new RouteNotFoundError({ req, res });
  });

  /**
   * Global error handler
   */
  app.use((err, req, res, next) => {
    if (err instanceof RouteNotFoundError) {
      return res.status(err.code).json(err.toJSON());
    }

    if (err instanceof APIError) {
      return res.status(err.code).json(err.toJSON());
    }

    res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
    });
  });

  const server = app.listen(port || env.PORT, () => {
    console.log('Server started on http://localhost:' + port || env.PORT);
  });

  return server;
};
