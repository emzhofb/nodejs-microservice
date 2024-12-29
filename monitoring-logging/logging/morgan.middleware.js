import morgan from "morgan"
import logger from "./logger.js"

const morganFormat = `{
  "method": ":method",
  "url": ":url",
  "status": ":status",
  "responseTime": ":response-time ms"
}`

function messageHandler(message) {
  logger.info('request received', JSON.parse(message.trim()))
}

const morganMiddleware = morgan(
  morganFormat,
  {
    stream: {
      write: messageHandler
    }
  }
)

export default morganMiddleware
