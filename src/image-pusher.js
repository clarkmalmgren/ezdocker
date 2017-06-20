import Log from './log';
import Pledge from './pledge';
import stream_parser from './stream-parser';

/**
 * Promise to push images.
 */
class ImagePusher extends Pledge {

  /**
   * Constructor
   *
   * @param {Docker} docker
   * @param {String} repositoryName
   */
  constructor(docker, repositoryName) {
    super();

    this._docker = docker;
    this._repositoryName = repositoryName;
  }

  /**
   * Actually push the images
   *
   * @param {function} resolve
   * @param {function} reject
   * @private
   */
  _start(resolve, reject) {
    this._docker.getImage(this._repositoryName).push({}, (error, response) => {
      if (error) {
        Log.error('Pushing Docker Image(s) Failed: ' + error.message);
        reject(error);
      } else {
        response.pipe(stream_parser());
        response.on('end', () => {
          resolve();
        });
      }
    }, {});
  }

}

export default ImagePusher;
