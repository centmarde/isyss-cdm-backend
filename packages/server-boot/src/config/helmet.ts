import { Express } from 'express';
import helmet from 'helmet';

export function initHelmet(app: Express) {
  app.use(
    helmet({
      referrerPolicy: { policy: 'no-referrer' },
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'validator.swagger.io'],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https:'],
        },
      },
    }),
  );
}
