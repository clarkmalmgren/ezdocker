import Log from './log';
import Pledge from './pledge';

/**
 * Builder pattern for removing images. Note that tags are not required (and ignored).
 */
class ImageLister extends Pledge {

  constructor(docker, repositoryName) {
    super();

    this._docker = docker;
    this._repositoryName = repositoryName;
  }

  start(resolve, reject) {
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