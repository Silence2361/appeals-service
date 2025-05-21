import express, { Router } from 'express';
import { checkSchema } from 'express-validator';
import * as AppealController from '../controllers/appeal.controller';
import * as AppealSchema from '../validation/schemas/appeal-schema';
import { validate } from '../middlewares/validate';
import { checkAppealExists } from '../middlewares/check-appeal-exists';

const appealRouter: Router = express.Router();

appealRouter.post(
  '/',
  checkSchema(AppealSchema.createAppealSchema),
  validate,
  AppealController.createAppeal
);

appealRouter.patch('/:id/take', checkAppealExists, AppealController.takeAppeal);

appealRouter.patch(
  '/:id/complete',
  checkSchema(AppealSchema.commentAppealSchema),
  validate,
  checkAppealExists,
  AppealController.completeAppeal
);

appealRouter.patch(
  '/:id/cancel',
  checkSchema(AppealSchema.commentAppealSchema),
  validate,
  checkAppealExists,
  AppealController.cancelAppeal
);

appealRouter.get(
  '/',
  checkSchema(AppealSchema.getAppealsSchema),
  validate,
  AppealController.findAppeals
);
appealRouter.post(
  '/cancel-all-in-progress',
  AppealController.cancelAllInProgress
);
appealRouter.delete('/:id', checkAppealExists, AppealController.deleteAppeal);

export { appealRouter };
