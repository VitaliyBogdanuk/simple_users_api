/**
 * Structured logger for Vercel-compatible logging.
 * Outputs JSON to stdout/stderr — visible in Vercel Logs.
 */

function formatLog(level, message, meta = {}) {
  const entry = {
    time: new Date().toISOString(),
    level,
    message,
    ...meta,
  };
  return JSON.stringify(entry);
}

const logger = {
  info(message, meta) {
    console.log(formatLog("info", message, meta));
  },

  error(message, meta) {
    console.error(formatLog("error", message, meta));
  },

  warn(message, meta) {
    console.warn(formatLog("warn", message, meta));
  },

  debug(message, meta) {
    if (process.env.NODE_ENV !== "production") {
      console.log(formatLog("debug", message, meta));
    }
  },
};

module.exports = logger;
