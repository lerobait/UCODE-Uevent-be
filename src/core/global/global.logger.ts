import { acs, ApiConfigService } from '@/config/api-config.service';
import { LoggerService } from '@nestjs/common/services/logger.service';
import chalk from 'chalk';

export enum LogLevel {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  LOG = 'LOG',
}

export class GlobalLogger implements LoggerService {
  constructor(
    private readonly cs: ApiConfigService,
    private readonly context: string = GlobalLogger.name,
  ) {}

  private static getCurrentTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  private print(level: LogLevel, message: string) {
    GlobalLogger.print(level, message, this.context, this.cs.isDevelopment());
  }

  private static print(
    level: LogLevel,
    message: string,
    context: string = GlobalLogger.name,
    isDevelopment: boolean = acs.isDevelopment(),
  ) {
    const timestamp = `[${this.getCurrentTimestamp()}]`;
    const levelTag = `[${level}]`;
    const appTag = `[APP]`;
    const contextTag = `[${context}]`;

    // If in production, disable colors
    if (!isDevelopment) {
      console.log(
        `${timestamp} ${levelTag} ${appTag} ${contextTag}: ${message}`,
      );
      return;
    }

    // Colors for development mode
    const lc =
      {
        INFO: chalk.green,
        WARNING: chalk.yellow,
        ERROR: chalk.red,
        LOG: chalk.cyan,
      }[level] || chalk.reset;

    const formattedMessage =
      chalk.blue(timestamp) +
      lc(` ${levelTag} `) +
      chalk.yellow(appTag) +
      chalk.blue(` ${contextTag}: `) +
      message;

    console.log(formattedMessage);
  }

  log(message: string) {
    this.print(LogLevel.LOG, message);
  }

  info(message: string) {
    this.print(LogLevel.INFO, message);
  }

  warn(message: string) {
    this.print(LogLevel.WARNING, message);
  }

  error(message: string) {
    this.print(LogLevel.ERROR, message);
  }

  static log(message: string, context: string = GlobalLogger.name) {
    this.print(LogLevel.INFO, message, context);
  }

  static info(message: string, context: string = GlobalLogger.name) {
    this.print(LogLevel.INFO, message, context);
  }

  static warn(message: string, context: string = GlobalLogger.name) {
    this.print(LogLevel.WARNING, message, context);
  }

  static error(message: string, context: string = GlobalLogger.name) {
    this.print(LogLevel.ERROR, message, context);
  }

  static getLogger(context: string): GlobalLogger {
    return new GlobalLogger(acs, context);
  }
}
