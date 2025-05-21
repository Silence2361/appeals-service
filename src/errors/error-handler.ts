import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ApiError } from '../errors/api-error';

export const errorHandler: ErrorRequestHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof ApiError) {
    res.status(err.toJSON().status).json(err.toJSON());
    return;
  }

  console.error('Unhandled error:', JSON.stringify(err, null, 2));

  const fallback = new ApiError(err.message || 'Internal Server Error', 500);
  res.status(fallback.toJSON().status).json(fallback.toJSON());
};
