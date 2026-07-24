import express from 'express';
import cors from 'cors';
import { env } from './env';
import { authRouter } from './routes/auth.routes';
import { youtubeRouter } from './routes/youtube.routes';
import { instagramRouter } from './routes/instagram.routes';
import { itemsRouter } from './routes/items.routes';
import { categoriesRouter } from './routes/categories.routes';
import { meRouter } from './routes/me.routes';

export const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow the configured web dashboard origin, any chrome-extension://
      // origin (the extension), and same-origin/non-browser requests.
      if (!origin || origin === env.clientOrigin || origin.startsWith('chrome-extension://')) {
        return callback(null, true);
      }
      callback(new Error('Not allowed by CORS'));
    },
  }),
);
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use('/api/auth', authRouter);
app.use('/api/youtube', youtubeRouter);
app.use('/api/instagram', instagramRouter);
app.use('/api/items', itemsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/me', meRouter);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});
