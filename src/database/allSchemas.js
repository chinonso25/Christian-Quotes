export const QUOTES_SCHEMA = 'quote';

export const QuotesSchema = {
  name: QUOTES_SCHEMA,
  primaryKey: 'Message',
  properties: {
    Message: 'string',
    Author: 'string'
  }
};
