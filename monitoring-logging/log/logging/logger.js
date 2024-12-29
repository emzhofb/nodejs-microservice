import winston from 'winston'

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  defaultMeta: {
    service: 'hello-service',
    builInfo: {
      version: '1.0.0',
      nodeVersion: process.version,
    }
  },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
    new winston.transports.File({
      format: winston.format.combine(
        winston.format.json(),
        winston.format.timestamp(),
      ),
      filename: 'combined.log',
    }),
    new winston.transports.File({
      format: winston.format.combine(
        winston.format.json(),
        winston.format.timestamp(),
      ),
      filename: 'error.log',
      level: 'error',
    }),
  ],
})

export default logger