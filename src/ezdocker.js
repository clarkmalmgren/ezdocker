import _ from 'lodash';
import Docker from 'dockerode';
import stream from 'stream';
import chalk from 'chalk';
import { argv } from 'yargs';
import TarUtils from './tar-utils';

class ImageBuilder {

  constructor(ezdocker) {
    this._repo = undefined;
    this._tag = undefined;
    this._paths = {};
    this._ezdocker = ezdocker;
  }

  repository(repo) {
    this._repo = repo;
    return this;
  }

  tag(tag) {
    this._tag = tag;
    return this;
  }

  addPath(src, dest) {
    this._paths[src] = dest || '.';
    return this;
  }

  getFullTag() {
    return this._repo + ':' + this._tag;
  }

  build() {
    return this._ezdocker.buildImage(this);
  }
}

class EZDocker {

  static createFromArgs() {
    return new EZDocker(argv.docker);
  }

  constructor(connectionOpts, docker, tarUtils = new TarUtils()) {
    this._docker = docker || new Docker(connectionOpts);
    this._tarUtils = tarUtils;
  }

  imageBuilder() {
    return new ImageBuilder(this);
  }

  buildImage(imageBuilder) {
    return this._tarUtils.all(imageBuilder._paths)
      .then((stream) => {
        return new Promise((resolve, reject) => {
          this._docker.buildImage(stream, {t: imageBuilder.getFullTag()}, (error, response) => {
            if (error) {
              reject(error);
            } else {
              response.pipe(stream_parser);
              response.on('end', () => {
                resolve();
              });
            }
          });
        });
      });
  }

  removeImages(repository) {
    return this.listImages(repository)
      .then((images) => {
        return Promise.all(_.map(images, (imageInfo) => {
          return this.removeImage(imageInfo.Id);
        }));
      });
  }

  listImages(repository) {
    return new Promise((resolve, reject) => {
      this._docker.listImages({filter: repository}, (error, response) => {
        if (error) {
          Log.error('Listing Docker Images Failed: ' + error.message);
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  removeImage(id) {
    return new Promise((resolve, reject) => {
      this._docker.getImage(id).remove({}, (error, response) => {
        if (error) {
          if (error.statusCode == 404) {
            Log.info('No docker images to remove.');
          } else {
            Log.error('Removing Docker Image Failed: ' + error.message);
            reject(error);
          }
        } else {
          Log.info('Removing Image ' + id);
          _.forEach(response, (step) => {
            _.forEach(step, (target, action) => {
              Log.info('  ' + action + ' ' + target);
            });
          });
          resolve();
        }
      });
    });
  };

  pushImages(repository) {
    return new Promise((resolve, reject) => {
      this._docker.getImage(repository).push({}, (error, response) => {
        if (error) {
          Log.error('Pushing Docker Image(s) Failed: ' + error.message);
          reject(error);
        } else {
          response.pipe(stream_parser);
          response.on('end', () => {
            resolve();
          });
        }
      });
    });
  }
}

const stream_parser = new stream.Writable({
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

class Log {

  static info(msg) {
    Log.log(chalk.blue('(Docker) ') + msg);
  }

  static error(msg) {
    Log.log(chalk.red('(Docker) ' + msg));
  }

  static log(msg) {
    let date = new Date();
    let time = `${Log.pad(date.getHours())}:${Log.pad(date.getMinutes())}:${Log.pad(date.getSeconds())}`;
    console.log(`[${chalk.gray(time)}] ${msg}`);
  }

  static pad(num, digits = 2) {
    let s = `${num}`;
    while (s.length < digits) {
      s = '0' + s;
    }
    return s;
  }
}

/* TODO: Figure out how to do this with a proper ES6 export */
export default EZDocker;