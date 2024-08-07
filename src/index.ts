import { env } from './config';
import { startServer } from './server';

startServer(env.PORT);
