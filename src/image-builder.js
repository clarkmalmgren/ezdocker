import Log from './log';
import Pledge from './pledge';
import StateError from './state-error';
import stream_parser from './stream-parser';
import TarUtils from './tar-utils';

/**
 * Both a promise and a builder pattern for creating images. The builder pattern allows for adding a tag
 * and paths.
 */
class ImageBuilder extends Pledge {

  /**
   * Constructor
   *
   * @param {Docker} docker
   * @param {String} repositoryName
   * @param {TarUtils} [tarUtils=new TarUtils()]
   */
  constructor(docker, repositoryName, tarUtils = new TarUtils()) {
    super();

    this._docker = docker;
    this._repositoryName = repositoryName;
    this._tarUtils = tarUtils;

    this._paths = {};

    /**
     * Language chain. Returns this.
     *
     * @type {ImageBuilder}
     */
    this.and = this;

    /**
     * Language chain. Returns this.
     *
     * @type {ImageBuilder}
     */
    this.with = this;
  }


  /**
   * @param {String} tag
   * @return {ImageBuilder} this
   */
  tag(tag) {
    this._tag = tag;
    return this;
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
  path(src, dest = '.') {
    this._paths[src] = dest;
    return this;
  }

  /**
   * Actually build the image.
   *
   * @param resolve
   * @param reject
   * @private
   */
  _start(resolve, reject) {
    if (!this._tag) {
      reject(new Error('Must include a tag to build image'));
      return;
    }

    let name = `${this._repositoryName}:${this._tag}`;

    this._tarUtils.all(this._paths)
      .then((stream) => {
        this._docker.buildImage(stream, {t: name}, (error, response) => {
          if (error) {
            reject(error);
          } else {
            response.pipe(stream_parser());
            response.on('end', () => {
              resolve();
            });
          }
        });
      })
      .catch((error) => {
        reject(error);
      });
  }

}

export default ImageBuilder;
