import { FilterQuery } from 'mongoose';
import { Appeal, AppealStatus } from '../models/appeal.model';
import * as AppealTypes from '../types/appeal.types';

export const createAppeal = (
  createAppealParams: AppealTypes.CreateAppealParams
): Promise<AppealTypes.AppealDocument> => Appeal.create(createAppealParams);

export const findAppealById = (
  id: string
): Promise<AppealTypes.AppealPlain | null> => Appeal.findById(id).lean();

export const updateAppealById = (
  id: string,
  update: AppealTypes.UpdateAppealParams
): Promise<AppealTypes.AppealDocument | null> =>
  Appeal.findByIdAndUpdate(id, update, { new: true });

export const findAppeals = (
  filter: FilterQuery<AppealTypes.AppealPlain>
): Promise<AppealTypes.AppealPlain[]> => Appeal.find(filter).lean();

export const cancelAllInProgressAppeals = (): Promise<{
  modifiedCount: number;
}> =>
  Appeal.updateMany(
    { status: AppealStatus.IN_PROGRESS },
    { status: AppealStatus.CANCELLED, comment: 'Auto canceled' }
  );

export const deleteAppeal = async (id: string): Promise<void> => {
  await Appeal.findByIdAndDelete(id);
};
