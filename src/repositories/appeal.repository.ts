import { FilterQuery } from 'mongoose';
import { Appeal, AppealDocument, AppealStatus } from '../models/appeal.model';

export const createAppealRepo = (data: { text: string; topic: string }): Promise<AppealDocument> =>
    Appeal.create(data);

export const findAppealByIdRepo = (id: string): Promise<AppealDocument | null> =>
    Appeal.findById(id);

export const updateAppealByIdRepo = (
    id: string,
    update: Partial<{
        status: AppealStatus;
        completionComment?: string;
        cancelComment?: string;
    }>
): Promise<AppealDocument | null> => Appeal.findByIdAndUpdate(id, update, { new: true });

export const findAppealsRepo = (filter: FilterQuery<AppealDocument>): Promise<AppealDocument[]> =>
    Appeal.find(filter);

export const cancelAllInProgressAppealsRepo = (): Promise<{ modifiedCount: number }> =>
    Appeal.updateMany(
        { status: "in_progress" },
        { status: "cancelled", cancelComment: "Auto canceled" }
    );

export const deleteAppealRepo = async (id: string): Promise<void> => {
    await Appeal.findByIdAndDelete(id);
};
