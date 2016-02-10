import Log from './log';
import Pledge from './pledge';

/**
 * Promise to list images.
 */
class ImageLister extends Pledge {

  /**
   * Constructor
   *
   * @param {Docker} docker
   * @param {String} repositoryNames
   */
  constructor(docker, repositoryName) {
    super();

    this._docker = docker;
    this._repositoryName = repositoryName;
  }

  /**
   * Actually list the images
   *
   * @param {function} resolve
   * @param {function} reject
   * @private
   */
  _start(resolve, reject) {
    this._docker.listImages({filter: this._repositoryName}, (error, response) => {
      if (error) {
        Log.error('Listing Docker Images Failed: ' + error.message);
        reject(error);
      } else {
        resolve(response);
      }
    });
  }
}

export default ImageLister;