import { model, Schema } from 'mongoose';
import { AppealDocument } from '../types/appeal.types';

export enum AppealStatus {
  NEW = 'new',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

const appealSchema = new Schema<AppealDocument>(
  {
    text: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: AppealStatus,
      default: AppealStatus.NEW,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Appeal = model<AppealDocument>('Appeal', appealSchema);
