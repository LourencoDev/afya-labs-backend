import { Router, Request, Response, NextFunction } from 'express';

const apiRouter = Router();

const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

const limiter = rateLimit({
    windowMs: 30 * 1000,
    max: 10
});

const speedLimiter = slowDown({
    windowMs: 30 * 1000,
    delayAfter: 1,
    delayMs: 500
})

apiRouter.get('*', limiter, speedLimiter, async (request: Request, response: Response, next: NextFunction) => {
    next();
});

apiRouter.get('/', async (request: Request, response: Response) => {
    response.json('basic API')
});

export default apiRouter;
