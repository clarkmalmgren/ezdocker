import chalk from 'chalk';
import moment from 'moment';

/**
 * Log writing system.
 */
class Log {

  /**
   * Log a message with blue (Docker) prefix. The message will not be chalked automatically.
   *
   * @param msg the message
   */
  static info(msg) {
    Log._log(chalk.blue('(Docker) ') + msg);
  }

  /**
   * Log a message with red (Docker) prefix. The msg will also be red.
   *
   * @param msg the message
   */
  static error(msg) {
    Log._log(chalk.red('(Docker) ' + msg));
  }

  /**
   * Log the msg and prepend it with a timestamp in the format of [HH:mm:ss].
   *
   * @param msg the message
   * @private
   */
  static _log(msg) {
    let time = moment().format('HH:mm:ss');
    console.log(`[${chalk.gray(time)}] ${msg}`);
  }
}

export default Log;