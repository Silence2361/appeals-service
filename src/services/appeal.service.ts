import * as AppealRepo from '../repositories/appeal.repository';
import { AppealStatus } from '../models/appeal.model';
import * as AppealTypes from '../types/appeal.types';

export const createAppeal = async (
  createAppealParams: AppealTypes.CreateAppealParams
): Promise<AppealTypes.AppealDocument> => {
  return AppealRepo.createAppeal(createAppealParams);
};

export const takeAppeal = async (
  takeAppealParams: AppealTypes.TakeAppealParams
): Promise<AppealTypes.AppealDocument | null> => {
  const { id } = takeAppealParams;

  const appeal = await AppealRepo.updateAppealById(id, {
    status: AppealStatus.IN_PROGRESS,
  });

  return appeal;
};

export const completeAppeal = async (
  completeAppealParams: AppealTypes.CompleteAppealParams
): Promise<AppealTypes.AppealDocument | null> => {
  const { id, comment } = completeAppealParams;

  const appeal = await AppealRepo.updateAppealById(id, {
    status: AppealStatus.COMPLETED,
    comment,
  });

  return appeal;
};

export const cancelAppeal = async (
  cancelAppealParams: AppealTypes.CancelAppealParams
): Promise<AppealTypes.AppealDocument | null> => {
  const { id, comment } = cancelAppealParams;

  const appeal = await AppealRepo.updateAppealById(id, {
    status: AppealStatus.CANCELLED,
    comment,
  });

  return appeal;
};

export const findAppeals = async (
  findAppealsParams: AppealTypes.FindAppealsParams
): Promise<AppealTypes.AppealPlain[]> => {
  const { from, to } = findAppealsParams;

  const filter: AppealTypes.FindAppealsFilter = {};

  if (from || to) {
    filter.createdAt = {};

    if (from) filter.createdAt.$gte = new Date(from);

    if (to) filter.createdAt.$lte = new Date(to);
  }

  return AppealRepo.findAppeals(filter);
};

export const cancelAllInProgress = async (): Promise<{
  modifiedCount: number;
}> => {
  const result = await AppealRepo.cancelAllInProgressAppeals();

  return { modifiedCount: result.modifiedCount };
};

export const deleteAppeal = async (
  deleteAppealParams: AppealTypes.DeleteAppealParams
): Promise<void> => {
  const { id } = deleteAppealParams;

  await AppealRepo.deleteAppeal(id);
};
