import { Request, Response, NextFunction, RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import { ValidatorError } from '../errors/validator-error';

export const validate: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(406).json(new ValidatorError(errors.array(), 406));
        return;
    }

    next();
};
