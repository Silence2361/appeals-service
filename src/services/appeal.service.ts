import {
    createAppealRepo,
    updateAppealByIdRepo,
    findAppealsRepo,
    cancelAllInProgressAppealsRepo,
    deleteAppealRepo,
} from '../repositories/appeal.repository';
import { ApiError } from '../errors/api-error';
import { validateObjectId } from '../utils/validate-object-id';
import { AppealDocument, AppealStatus } from '../models/appeal.model';

export const createAppeal = async (text: string, topic: string): Promise<AppealDocument> => {
    return createAppealRepo({ text, topic });
};

export const takeAppeal = async (id: string): Promise<AppealDocument> => {
    validateObjectId(id, 'Appeal ID');

    const appeal = await updateAppealByIdRepo(id, { status: AppealStatus.IN_PROGRESS });
    if (!appeal) throw new ApiError(null, 404, undefined, 'Appeal not found');

    return appeal;
};

export const completeAppeal = async (id: string, completionComment: string): Promise<AppealDocument> => {
    validateObjectId(id, 'Appeal ID');

    const appeal = await updateAppealByIdRepo(id, {
        status: AppealStatus.COMPLETED,
        completionComment,
    });

    if (!appeal) throw new ApiError(null, 404, undefined, 'Appeal not found');
    return appeal;
};

export const cancelAppeal = async (id: string, cancelComment: string): Promise<AppealDocument> => {
    validateObjectId(id, 'Appeal ID');

    const appeal = await updateAppealByIdRepo(id, {
        status: AppealStatus.CANCELLED,
        cancelComment,
    });

    if (!appeal) throw new ApiError(null, 404, undefined, 'Appeal not found');
    return appeal;
};

export const getAppeals = async (from?: string, to?: string): Promise<AppealDocument[]> => {
    const filter: Record<string, any> = {};

    if (from || to) {
        filter.createdAt = {};
        if (from) filter.createdAt.$gte = new Date(from);
        if (to) filter.createdAt.$lte = new Date(to);
    }

    return findAppealsRepo(filter);
};

export const cancelAllInProgress = async (): Promise<{ modifiedCount: number }> => {
    const result = await cancelAllInProgressAppealsRepo();
    return { modifiedCount: result.modifiedCount };
};

export const deleteAppeal = async (id: string): Promise<void> => {
    validateObjectId(id, 'Appeal ID');
    await deleteAppealRepo(id);
};
