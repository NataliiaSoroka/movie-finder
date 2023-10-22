/**
 * In production system we will use somethiing like Sentry
 */
const logger = {
  info: console.log, // eslint-disable-line no-console
  error: console.error, // eslint-disable-line no-console
};

export default logger;
