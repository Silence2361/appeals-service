import { model, Schema } from "mongoose";

export enum AppealStatus {
    NEW = 'new',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled'
}

export interface AppealInterface {
    text: string;
    status: AppealStatus;
    completionComment?: string;
    cancelComment?: string;
}

export type AppealDocument = AppealInterface & Document;

const appealSchema = new Schema<AppealDocument>({
    text: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: AppealStatus,
        default: AppealStatus.NEW,
    },
    completionComment: {
        type: String,
    },
    cancelComment: {
        type: String,
    },
}, { timestamps: true });

export const Appeal = model<AppealDocument>('Appeal', appealSchema);