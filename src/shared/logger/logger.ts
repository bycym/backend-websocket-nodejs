import winston, { format } from 'winston'
import * as Transport from 'winston-transport'

const { combine, timestamp, prettyPrint } = format
const createLogger = (serviceName: string) => {
  const {
    NODE_ENV = '',
  } = process.env

  const transports: Transport[] = [new winston.transports.Console()]

  return winston.createLogger({
    levels: winston.config.syslog.levels,
    format: combine(timestamp(), prettyPrint()),
    transports,
    exitOnError: false
  })
}

export const logger = createLogger(
  'yolo'
)