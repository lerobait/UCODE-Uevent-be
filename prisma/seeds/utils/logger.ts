import chalk = require('chalk');

// Define log types with their emojis and colors
type LogLevel = 'info' | 'success' | 'warning' | 'error' | 'start' | 'complete';

interface LogConfig {
  emoji: string;
  color: (text: string) => string;
  prefix: string;
}

const LOG_CONFIGS: Record<LogLevel, LogConfig> = {
  info: {
    emoji: 'ℹ️ ',
    color: chalk.blue,
    prefix: 'INFO',
  },
  success: {
    emoji: '✅ ',
    color: chalk.green,
    prefix: 'SUCCESS',
  },
  warning: {
    emoji: '⚠️ ',
    color: chalk.yellow,
    prefix: 'WARNING',
  },
  error: {
    emoji: '❌ ',
    color: chalk.red,
    prefix: 'ERROR',
  },
  start: {
    emoji: '🚀 ',
    color: chalk.magenta,
    prefix: 'START',
  },
  complete: {
    emoji: '🏁 ',
    color: chalk.cyan,
    prefix: 'COMPLETE',
  },
};

// Track operation timing
const timers = new Map<string, number>();

// Logger functions
export const logger = {
  /**
   * Log an informational message
   */
  info: (message: string): void => {
    const { emoji, color, prefix } = LOG_CONFIGS.info;
    console.log(`${emoji} ${color(`[${prefix}]`)} ${message}`);
  },

  /**
   * Log a success message
   */
  success: (message: string): void => {
    const { emoji, color, prefix } = LOG_CONFIGS.success;
    console.log(`${emoji} ${color(`[${prefix}]`)} ${message}`);
  },

  /**
   * Log a warning message
   */
  warning: (message: string): void => {
    const { emoji, color, prefix } = LOG_CONFIGS.warning;
    console.log(`${emoji} ${color(`[${prefix}]`)} ${message}`);
  },

  /**
   * Log an error message
   */
  error: (message: string, error?: unknown): void => {
    const { emoji, color, prefix } = LOG_CONFIGS.error;
    console.error(`${emoji} ${color(`[${prefix}]`)} ${message}`);
    if (error) {
      if (error instanceof Error) {
        console.error(`   ${chalk.red('→')} ${error.message}`);
        if (error.stack) {
          console.error(
            `   ${chalk.red('→')} ${error.stack.split('\n').slice(1).join('\n')}`,
          );
        }
      } else {
        console.error(`   ${chalk.red('→')} ${String(error)}`);
      }
    }
  },

  /**
   * Start timing an operation
   */
  startOperation: (operation: string): void => {
    const { emoji, color, prefix } = LOG_CONFIGS.start;
    timers.set(operation, Date.now());
    console.log(`${emoji} ${color(`[${prefix}]`)} ${operation}...`);
  },

  /**
   * Complete an operation and log the time taken
   */
  completeOperation: (operation: string, details?: string): void => {
    const { emoji, color, prefix } = LOG_CONFIGS.complete;
    const startTime = timers.get(operation);

    if (startTime) {
      const duration = Date.now() - startTime;
      const formattedDuration = formatDuration(duration);
      const message = details
        ? `${operation} completed in ${chalk.bold(formattedDuration)} - ${details}`
        : `${operation} completed in ${chalk.bold(formattedDuration)}`;
      console.log(`${emoji} ${color(`[${prefix}]`)} ${message}`);
      timers.delete(operation);
    } else {
      console.log(`${emoji} ${color(`[${prefix}]`)} ${operation} completed`);
    }
  },

  /**
   * Log a progress update
   */
  progress: (current: number, total: number, operation: string): void => {
    if (current < 0 || total <= 0) {
      return;
    }
    const percentage = Math.round((current / total) * 100);
    const progressBar = createProgressBar(percentage);
    process.stdout.write(
      `\r🔄 ${progressBar} ${percentage}% | ${operation}: ${current}/${total}`,
    );
    if (current === total) {
      process.stdout.write('\n');
    }
  },

  /**
   * Create a section header
   */
  section: (title: string): void => {
    const line = '='.repeat(title.length + 10);
    console.log('\n' + chalk.cyan(line));
    console.log(chalk.cyan(`====  ${chalk.bold.white(title)}  ====`));
    console.log(chalk.cyan(line) + '\n');
  },
};

// Helper functions
function createProgressBar(percentage: number): string {
  const width = 20;
  const completed = Math.floor((width * percentage) / 100);
  const remaining = width - completed;
  return chalk.green('█'.repeat(completed)) + chalk.gray('█'.repeat(remaining));
}

function formatDuration(ms: number): string {
  if (ms < 1000) {
    return `${ms}ms`;
  } else if (ms < 60000) {
    return `${(ms / 1000).toFixed(2)}s`;
  } else {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(2);
    return `${minutes}m ${seconds}s`;
  }
}
