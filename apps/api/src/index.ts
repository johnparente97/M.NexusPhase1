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
import web3authRouter from './routes/web3auth';
import { paymentRouter } from './routes/payment';

const app = new Hono<AppEnv>();

// ── Mount Global Middlewares ──
app.use('*', corsMiddleware());
app.use('*', loggerMiddleware());
app.use('/api/*', apiRateLimit());

// ── Root landing page to avoid raw 404s ──
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Meridian Nexus API Gateway</title>
      <style>
        body {
          background-color: #171719;
          color: #f4f4f5;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          margin: 0;
          padding: 20px;
          box-sizing: border-box;
        }
        .container {
          max-width: 500px;
          width: 100%;
          background-color: #1b1b1c;
          border: 1px solid #272729;
          border-radius: 16px;
          padding: 30px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        h1 {
          font-size: 24px;
          margin-bottom: 8px;
          color: #f4f4f5;
          letter-spacing: -0.5px;
        }
        .badge {
          display: inline-block;
          background-color: rgba(39, 242, 147, 0.1);
          color: #27F293;
          border: 1px solid rgba(39, 242, 147, 0.2);
          font-size: 10px;
          font-weight: bold;
          padding: 4px 10px;
          border-radius: 9999px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 20px;
        }
        p {
          font-size: 13px;
          color: #a1a1aa;
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .links {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        a {
          display: block;
          padding: 12px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .btn-primary {
          background: linear-gradient(135deg, #27F293 0%, #10B981 100%);
          color: #171719;
        }
        .btn-primary:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        .btn-secondary {
          background-color: #272729;
          color: #f4f4f5;
          border: 1px solid #3f3f46;
        }
        .btn-secondary:hover {
          background-color: #3f3f46;
        }
        .footer {
          margin-top: 30px;
          font-size: 10px;
          color: #71717a;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="badge">Nexus API Worker</div>
        <h1>Meridian Nexus API</h1>
        <p>This is the secure backend intelligence and settlement gateway for Meridian Nexus. The API services are fully operational.</p>
        <div class="links">
          <a href="/api/health" class="btn-primary">Check System Health</a>
          <a href="https://github.com/johnparente97/M.NexusPhase1" target="_blank" class="btn-secondary">View GitHub Repository</a>
        </div>
        <div class="footer">
          Meridian Foundation &copy; 2026. Built on Base Sepolia.
        </div>
      </div>
    </body>
    </html>
  `);
});

// ── Mount API Routers ──
app.route('/api/health', healthRouter);
app.route('/api/auth', authRouter);
app.route('/api/auth/web3', web3authRouter);
app.route('/api/payment', paymentRouter);
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
