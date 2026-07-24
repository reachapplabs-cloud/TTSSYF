import { app } from './app';
import { env } from './env';

app.listen(env.port, () => {
  console.log(`Ugram API listening on http://localhost:${env.port}`);
});
