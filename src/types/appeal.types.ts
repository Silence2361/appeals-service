import { FilterQuery } from 'mongoose';
import { AppealStatus } from '../models/appeal.model';

export type AppealPlain = {
  _id: string;
  text: string;
  topic: string;
  status: AppealStatus;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AppealDocument = AppealPlain & Document;

export type CreateAppealParams = {
  text: string;
  topic: string;
};

export type TakeAppealParams = {
  id: string;
};

export type UpdateAppealParams = {
  status?: AppealStatus;
  comment?: string;
};

export type CompleteAppealParams = {
  id: string;
  comment: string;
};

export type CancelAppealParams = {
  id: string;
  comment: string;
};

export type FindAppealsParams = {
  from?: string;
  to?: string;
};

export type FindAppealsFilter = FilterQuery<AppealPlain>;

export type DeleteAppealParams = {
  id: string;
};
