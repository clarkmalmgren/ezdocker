import chalk from 'chalk';
import Log from './log';
import stream from 'stream';

/**
 * Writable output stream that reads and transposes messages from the docker host into readable messages
 * that get printed out to STDOUT.
 *
 * @type {stream.Writable}
 */
export default function(){
  return new stream.Writable({
    write: function (chunk, encoding, next) {
      chunk.toString().trim().split('\n').forEach(line => {
        var data = JSON.parse(line);

        if (data.stream) {
          data.stream = data.stream.replace(/\n$/, '');
          Log.info(data.stream);
        } else {
          Log.info(chalk.blue('RAW: ') + JSON.stringify(data));
        }
      });

      next();
    }
  });
}
