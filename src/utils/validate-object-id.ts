import { isValidObjectId } from 'mongoose';
import { ApiError } from '../errors/api-error';

export const validateObjectId = (id: string, resourceName = 'ID') => {
    if (!isValidObjectId(id)) {
        throw new ApiError(null, 400, undefined, `Invalid ${resourceName}`);
    }
};
