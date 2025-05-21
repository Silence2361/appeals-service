import { Request, Response } from 'express';
import * as AppealService from '../services/appeal.service';
import * as AppealDto from '../controllers/dto/appeal.dto';
import { catchAsync } from '../utils/catch-async';

export const createAppeal = catchAsync(
  async (req: Request<{}, {}, AppealDto.CreateAppealDto>, res: Response) => {
    const { text, topic } = req.body;
    const appeal = await AppealService.createAppeal({ text, topic });
    res.status(201).json(appeal);
  }
);

export const takeAppeal = catchAsync(
  async (req: Request<{ id: string }>, res: Response) => {
    const appeal = await AppealService.takeAppeal({ id: req.params.id });
    res.json(appeal);
  }
);

export const completeAppeal = catchAsync(
  async (
    req: Request<{ id: string }, {}, AppealDto.CompleteAppealDto>,
    res: Response
  ) => {
    const { comment } = req.body;
    const appeal = await AppealService.completeAppeal({
      id: req.params.id,
      comment,
    });
    res.json(appeal);
  }
);

export const cancelAppeal = catchAsync(
  async (
    req: Request<{ id: string }, {}, AppealDto.CancelAppealDto>,
    res: Response
  ) => {
    const { comment } = req.body;
    const appeal = await AppealService.cancelAppeal({
      id: req.params.id,
      comment,
    });
    res.json(appeal);
  }
);

export const findAppeals = catchAsync(
  async (req: Request<{}, {}, {}, AppealDto.GetAppealsDto>, res: Response) => {
    const { from, to } = req.query;
    const appeals = await AppealService.findAppeals({ from, to });
    res.json(appeals);
  }
);

export const cancelAllInProgress = catchAsync(
  async (_req: Request, res: Response) => {
    const result = await AppealService.cancelAllInProgress();
    res.json({ modifiedCount: result.modifiedCount });
  }
);

export const deleteAppeal = catchAsync(
  async (req: Request<{ id: string }>, res: Response) => {
    await AppealService.deleteAppeal({ id: req.params.id });
    res.status(204).send();
  }
);
