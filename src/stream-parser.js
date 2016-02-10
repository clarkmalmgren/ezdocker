import chalk from 'chalk';
import Log from './log';
import stream from 'stream';

/**
 * Writable output stream that reads and transposes messages from the docker host into readable messages
 * that get printed out to STDOUT.
 *
 * @type {stream.Writable}
 */
export default new stream.Writable({
  write: function (chunk, encoding, next) {
    var data = JSON.parse(chunk.toString());

    if (data.stream) {
      data.stream = data.stream.replace(/\n$/, '');
      Log.info(data.stream);
    } else {
      Log.info(chalk.blue('RAW: ') + JSON.stringify(data));
    }

    next();
  }
});
