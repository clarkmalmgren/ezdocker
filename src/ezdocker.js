import _ from 'lodash';
import { argv } from 'yargs';
import chalk from 'chalk';
import Docker from 'dockerode';
import moment from 'moment';
import stream from 'stream';
import TarUtils from './tar-utils';

/**
 * Builder pattern for building up images names following the convention: `REGISTRY[:PORT]/USER/REPO[:TAG]`.
 */
class NameBuilder {

  /**
   * Constructor
   *
   * @param {EZDocker} ezdocker
   */
  constructor(ezdocker) {
    this._ezdocker = ezdocker;

    this._registry = undefined;
    this._port = undefined;
    this._user = undefined;
    this._repo = undefined;
    this._tag = undefined;
  }

  /**
   * @param {String} registry
   * @return {NameBuilder} this
   */
  registry(registry) {
    this._registry = registry;
    return this;
  }

  /**
   * @param {String} port
   * @return {NameBuilder} this
   */
  port(port) {
    this._port = port;
    return this;
  }

  /**
   * @param {String} user
   * @return {NameBuilder} this
   */
  user(user) {
    this._user = user;
    return this;
  }

  /**
   * @param {String} repo
   * @return {NameBuilder} this
   */
  repo(repo) {
    this._repo = repo;
    return this;
  }

  /**
   * @param {String} tag
   * @return {NameBuilder} this
   */
  tag(tag) {
    this._tag = tag;
    return this;
  }

  /**
   * Get the short name (excluding tag) following the convention: `REGISTRY[:PORT]/USER/REPO`
   *
   * @return {String} the short name
   */
  getShortName() {
    let name = this._registry;
    if (this._port) {
      name += ':' + this._port;
    }
    name += `/${this._user}/${this._repo}`;

    return name;
  }

  /**
   * Get the full name (indluding tag) following the convention: `REGISTRY[:PORT]/USER/REPO[:TAG]`
   *
   * @return {String} the short name
   */
  getFullName() {
    return `${this.getShortName()}:${this._tag}`;
  }
}

/**
 * Builder pattern for creating images.
 */
class ImageBuilder extends NameBuilder {

  /**
   * Constructor
   *
   * @param {EZDocker} ezdocker
   */
  constructor(ezdocker) {
    super(ezdocker);

    this._paths = {};
  }

  /**
   * Add a path with an optional mapping onto a sub-folder path for a destination. These folders will be recursively
   * passed to the Docker image according to this mapping.  By default, the dest will be '.' meaning that it is the
   * root folder from the perspective of the docker build process. The Dockerfile should always be put into this
   * default root ('.') folder.
   *
   * @param {String} src the source folder
   * @param {String} [dest='.'] the destination folder
   * @return {ImageBuilder} this
   */
  addPath(src, dest = '.') {
    this._paths[src] = dest;
    return this;
  }

  /**
   * Actually build the image using the paths and naming as recorded with this builder. This will actually
   * send the mapped folders (and the Dockerfile contained within) to the docker host for building. This returns
   * a Promise that will resolve when the build finishes or reject with the associated error on failure.
   *
   * @return {Promise<null,Error>} a promise that will resolve when the build finishes
   */
  build() {
    return this._ezdocker._buildImage(this);
  }
}

/**
 * Builder pattern for removing images. Note that tags are not required (and ignored).
 */
class ImageRemover extends NameBuilder {

  /**
   * Constructor
   *
   * @param {EZDocker} ezdocker
   */
  constructor(ezdocker) {
    super(ezdocker);
  }

  /**
   * Remove images that match the built name from the docker host.
   *
   * @return {Promise<null,Error>} a promise that will resolve when the removal finishes
   */
  remove() {
    return this._ezdocker._removeImages(this);
  }
}

/**
 * Builder pattern for pushing images. Note that tags are not required (and ignored).
 */
class ImagePusher extends NameBuilder {

  /**
   * Constructor
   *
   * @param {EZDocker} ezdocker
   */
  constructor(ezdocker) {
    super(ezdocker);
  }

  /**
   * Push images from the docker host to the named docker registry.
   *
   * @return {Promise<null,Error>} a promise that will resolve when the pushing finishes
   */
  push() {
    return this._ezdocker._pushImages(this);
  }
}

/**
 * EZDocker provides easy to use access to builder-pattern classes for building images, removing images and pushing
 * images to a docker registry. See the README for more information on how to use.
 */
class EZDocker {

  /**
   * Creates a EZDocker using command line arguments.
   *
   * @param {{}} [args=argv] the arguments that default to those from yargs.argv
   *
   * @return {EZDocker}
   */
  static createFromArgs(args = argv) {
    return new EZDocker(args.docker);
  }

  /**
   * Constructs a new EZDocker. See the README for valid connectionOpts. `docker` and `tarUtils` are only for use
   * in unit-testing to inject mock dependencies.
   *
   * @param {Map<String,String>} connectionOpts configures the connection method to
   * @param {Docker} [docker] used for dependency injection, if set, connectionOpts are ignored
   * @param {TarUtils} [tarUtils=new TarUtils()] used for dependency injection
   */
  constructor(connectionOpts, docker, tarUtils = new TarUtils()) {
    this._docker = docker || new Docker(connectionOpts);
    this._tarUtils = tarUtils;
  }

  /**
   * Creates a new image builder.
   *
   * @return {ImageBuilder}
   */
  imageBuilder() {
    return new ImageBuilder(this);
  }

  /**
   * Creates a new image remover.
   *
   * @return {ImageRemover}
   */
  imageRemover() {
    return new ImageRemover(this);
  }

  /**
   * Creates a new image pusher.
   *
   * @return {ImagePusher}
   */
  imagePusher() {
    return new ImagePusher(this);
  }

  /**
   * Build the image. This creates a single tar stream of all the paths and sends it to the docker host for building.
   *
   * @param {ImageBuilder} imageBuilder the image builder
   * @return {Promise<null,Error>}
   * @private
   */
  _buildImage(imageBuilder) {
    return this._tarUtils.all(imageBuilder._paths)
      .then((stream) => {
        return new Promise((resolve, reject) => {
          this._docker.buildImage(stream, {t: imageBuilder.getFullName()}, (error, response) => {
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

  /**
   * Remove images.
   *
   * @param {ImageRemover} imageRemover the image remover
   * @return {Promise<null,Error>}
   * @private
   */
  _removeImages(imageRemover) {
    return this._listImages(imageRemover.getShortName())
      .then((images) => {
        return Promise.all(_.map(images, (imageInfo) => {
          return this.removeImage(imageInfo.Id);
        }));
      });
  }

  /**
   * Lists images on the docker host by short name (no tag).
   *
   * @param {String} shortName the short name
   * @return {Promise<[{}],Error>} a promise that resolves with an array of maps containing image info
   * @private
   */
  _listImages(shortName) {
    return new Promise((resolve, reject) => {
      this._docker.listImages({filter: shortName}, (error, response) => {
        if (error) {
          Log.error('Listing Docker Images Failed: ' + error.message);
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  /**
   * Remove a single image by hex id (short or long).
   *
   * @param {String} id hex id for the image
   * @return {Promise<null,Error>} promise that resolves after the image has been removed
   */
  removeImage(id) {
    return new Promise((resolve, reject) => {
      this._docker.getImage(id).remove({}, (error, response) => {
        if (error) {
          if (error.statusCode == 404) {
            Log.info('No docker images to remove.');
            resolve();
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

  /**
   * Push images.
   *
   * @param {ImagePusher} imagePusher the image pusher
   * @return {Promise<null,Error>}
   * @private
   */
  _pushImages(imagePusher) {
    return new Promise((resolve, reject) => {
      this._docker.getImage(imagePusher.getShortName()).push({}, (error, response) => {
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

/**
 * Writable output stream that reads and transposes messages from the docker host into readable messages
 * that get printed out to STDOUT.
 *
 * @type {stream.Writable}
 */
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

export { NameBuilder, ImageBuilder, ImageRemover, ImagePusher, EZDocker, Log, stream_parser };
export default EZDocker;