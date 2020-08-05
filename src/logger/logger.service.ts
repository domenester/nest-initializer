import { LoggerService } from '@nestjs/common'
import * as moment from 'moment-timezone'
import * as request from 'request'

export class Logger implements LoggerService {

  format (content: string, type: string): string {
    const now = moment(new Date()).tz('America/Sao_Paulo')
    return (
      `${type} [${now.format('DD/MM/YYYY - HH:mm:ss')}]: ${content}`
    )
  }

  handle (message: string, type: string): string {
    const content = this.format(`${message}`, type)
    const { LOGEASY_URL } = process.env
    if (type === 'error' || type === 'warn') {
      try {
        request(LOGEASY_URL, {
          headers: { ['Content-Type']: 'application/json' },
          method: 'post',
          body: JSON.stringify({
            stream: 'nest',
            name: 'nest-initializer',
            message: message,
            severity: type
          })
        })
      } catch (err) {
        console.error('err: ', err)
      }
    }
    console.log(content)
    return content
  }

  log(message: string): string {
    return this.handle(message, 'info')
  }
  error(message: string, trace: string): string {
    return this.handle(`${message} | ${trace}`, 'error')
  }
  warn(message: string): string {
    return this.handle(message, 'warn')
  }
}