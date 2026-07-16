import { Hono } from 'hono';
import { AppEnv } from './types';
import { corsMiddleware } from './middleware/cors';
import { loggerMiddleware } from './middleware/logger';
import { errorHandlerMiddleware } from './middleware/error-handler';
import { apiRateLimit } from './middleware/rate-limit';
import { healthRouter } from './routes/health';
import { authRouter } from './routes/auth';
import { workflowsRouter } from './routes/workflows';
import { runsRouter } from './routes/runs';
import { favoritesRouter } from './routes/favorites';
import { reviewsRouter } from './routes/reviews';
import { usersRouter } from './routes/users';
import { creatorRouter } from './routes/creator';
import { settlementRouter } from './routes/settlement';

const app = new Hono<AppEnv>();

// ── Mount Global Middlewares ──
app.use('*', corsMiddleware());
app.use('*', loggerMiddleware());
app.use('/api/*', apiRateLimit());

// ── Mount API Routers ──
app.route('/api/health', healthRouter);
app.route('/api/auth', authRouter);
app.route('/api/workflows', workflowsRouter);
app.route('/api', runsRouter); // handles workflows/:id/run and runs/*
app.route('/api/favorites', favoritesRouter);
app.route('/api/reviews', reviewsRouter);
app.route('/api/users', usersRouter);
app.route('/api/creator', creatorRouter);
app.route('/api/settlement', settlementRouter);

// ── Catch-all Global Error Handler ──
app.onError(errorHandlerMiddleware());

export default app;
