import { Request, Response } from 'express';
import {
    createAppeal,
    takeAppeal,
    completeAppeal,
    cancelAppeal,
    getAppeals,
    cancelAllInProgress,
    deleteAppeal,
} from '../services/appeal.service';
import { CreateAppealDto } from './dto/create-appeal.dto';
import { GetAppealsDto } from './dto/get-appeals.dto';
import { CompleteAppealDto } from './dto/complete-appeal.dto';
import { CancelAppealDto } from './dto/cancel-appeal.dto';

export const createAppealHandler = async (req: Request<{}, {}, CreateAppealDto>, res: Response) => {
    const { text, topic } = req.body;
    const appeal = await createAppeal(text, topic);
    res.status(201).json(appeal);
};

export const takeAppealHandler = async (req: Request<{ id: string }>, res: Response) => {
    const appeal = await takeAppeal(req.params.id);
    res.status(200).json(appeal);
};

export const completeAppealHandler = async (req: Request<{ id: string }, {}, CompleteAppealDto>, res: Response) => {
    const { completionComment } = req.body;
    const appeal = await completeAppeal(req.params.id, completionComment);
    res.status(200).json(appeal);
};

export const cancelAppealHandler = async (req: Request<{ id: string }, {}, CancelAppealDto>, res: Response) => {
    const { cancelComment } = req.body;
    const appeal = await cancelAppeal(req.params.id, cancelComment);
    res.status(200).json(appeal);
};

export const getAppealsHandler = async (req: Request<{}, {}, {}, GetAppealsDto>, res: Response) => {
    const { from, to } = req.query;
    const appeals = await getAppeals(from, to);
    res.status(200).json(appeals);
};

export const cancelAllInProgressHandler = async (_req: Request, res: Response) => {
    const result = await cancelAllInProgress();
    res.status(200).json({ modifiedCount: result.modifiedCount });
};

export const deleteAppealHandler = async (req: Request<{ id: string }>, res: Response) => {
    await deleteAppeal(req.params.id);
    res.status(204).send();
};
