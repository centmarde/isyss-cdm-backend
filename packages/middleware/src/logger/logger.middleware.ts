import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LogsMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const startTime = Date.now();

    res.on('finish', () => {
      const { statusCode, statusMessage } = res;
      const contentLength = res.get('Content-Length') || 0;
      const duration = Date.now() - startTime;
      const clientIP = req.ip;
      const userAgent = req.get('user-agent') || 'N/A';

      const logMessage = `${method} ${originalUrl} ${statusCode} ${statusMessage} - ${contentLength} bytes - ${duration}ms - IP: ${clientIP} - UA: ${userAgent}`;

      if (statusCode >= 500) {
        this.logger.error(logMessage);
      } else if (statusCode >= 400) {
        this.logger.warn(logMessage);
      } else {
        this.logger.log(logMessage);
      }
    });

    next();
  }
}
