export type CreateAppealDto = {
  text: string;
  topic: string;
};

export type CancelAppealDto = {
  comment: string;
};

export type CompleteAppealDto = {
  comment: string;
};

export type GetAppealsDto = {
  from?: string;
  to?: string;
};
