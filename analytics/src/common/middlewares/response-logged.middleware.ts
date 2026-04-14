import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ResponseLoggedMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', () => {
      console.log('baseUrl:', req.baseUrl);
      console.log('statusCode:', res.statusCode);
      console.log('responseTime:', Date.now() - start, 'ms');
    });
    next();
  }
}