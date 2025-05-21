import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
import { Appeal } from '../models/appeal.model';
import { ApiError } from '../errors/api-error';

export const checkAppealExists = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return next(new ApiError('Invalid ID format', 400));
  }

  const appeal = await Appeal.findById(id).lean();
  if (!appeal) {
    return next(new ApiError('Appeal not found', 404));
  }

  next();
};
