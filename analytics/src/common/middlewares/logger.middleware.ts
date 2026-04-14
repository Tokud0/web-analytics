import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    console.log(`method: ${req.method}`);


    if (req.body && Object.keys(req.body).length > 0) {
      console.log('body:', req.body);
    } else {
      console.log('body: <empty>');
    }

   
    if (req.query && Object.keys(req.query).length > 0) {
      console.log('query:', req.query);
    } else {
      console.log('query: <empty>');
    }

    next();
  }
}