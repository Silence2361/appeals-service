import { Schema } from 'express-validator';

export const createAppealSchema: Schema = {
  text: {
    isString: {
      errorMessage: 'Text must be a string',
    },
    notEmpty: {
      errorMessage: 'Text is required',
    },
    isLength: {
      options: { min: 5, max: 500 },
      errorMessage: 'Text must be between 5 and 500 characters',
    },
  },
  topic: {
    isString: {
      errorMessage: 'Topic must be a string',
    },
    notEmpty: {
      errorMessage: 'Topic is required',
    },
    isLength: {
      options: { min: 3, max: 100 },
      errorMessage: 'Topic must be between 3 and 100 characters',
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
    isLength: {
      options: { min: 5, max: 300 },
      errorMessage: 'Comment must be between 5 and 300 characters',
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
