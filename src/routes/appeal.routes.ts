import express, { Router } from 'express';
import { checkSchema } from 'express-validator';
import {
    createAppealHandler,
    takeAppealHandler,
    completeAppealHandler,
    cancelAppealHandler,
    getAppealsHandler,
    cancelAllInProgressHandler,
    deleteAppealHandler,
} from '../controllers/appeal.controller';
import {
    createAppealSchema,
    completeAppealSchema,
    cancelAppealSchema,
    getAppealsSchema,
} from './validation-schemas/appeal-schema';
import { validate } from '../middlewares/validate';


const appealRouter: Router = express.Router();

appealRouter.post(
    '/',
    checkSchema(createAppealSchema),
    validate,
    createAppealHandler
);

appealRouter.patch(
    '/:id/take',
    takeAppealHandler
);

appealRouter.patch(
    '/:id/complete',
    checkSchema(completeAppealSchema),
    validate,
    completeAppealHandler
);

appealRouter.patch(
    '/:id/cancel',
    checkSchema(cancelAppealSchema),
    validate,
    cancelAppealHandler
);

appealRouter.get(
    '/',
    checkSchema(getAppealsSchema),
    validate,
    getAppealsHandler
);
appealRouter.post(
    '/cancel-all-in-progress',
    cancelAllInProgressHandler
);
appealRouter.delete(
    '/:id',
    deleteAppealHandler
);

export { appealRouter };
