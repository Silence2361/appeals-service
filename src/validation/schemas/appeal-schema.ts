import { Schema } from 'express-validator';

export const createAppealSchema: Schema = {
  text: {
    isString: {
      errorMessage: 'Text must be a string',
    },
    notEmpty: {
      errorMessage: 'Text is required',
    },
  },
  topic: {
    isString: {
      errorMessage: 'Topic must be a string',
    },
    notEmpty: {
      errorMessage: 'Topic is required',
    },
  },
};

export const commentAppealSchema: Schema = {
  comment: {
    isString: {
      errorMessage: 'Comment must be a string',
    },
    notEmpty: {
      errorMessage: 'Comment is required',
    },
  },
};

export const getAppealsSchema: Schema = {
  from: {
    optional: true,
    isISO8601: {
      errorMessage: 'from must be a valid date',
    },
  },
  to: {
    optional: true,
    isISO8601: {
      errorMessage: 'to must be a valid date',
    },
  },
};
