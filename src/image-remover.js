import _ from 'lodash';
import ImageLister from './image-lister';
import Log from './log';
import Pledge from './pledge';

/**
 * Builder pattern for removing images. Note that tags are not required (and ignored).
 */
class ImageRemover extends Pledge {

  constructor(docker, repositoryName, imageLister) {
    super();

    this._docker = docker;
    this._repositoryName = repositoryName;

    this._imageLister = imageLister || new ImageLister(docker, repositoryName);
  }

  /**
   * Actually remove the images.
   *
   * @param resolve ignored
   * @param reject ignored
   */
  start(resolve, reject) {
    return this._imageLister
      .then((images) => {
        return Promise.all(_.map(images, (imageInfo) => {
          return this.removeSingleImage(imageInfo.Id);
        }));
      });
  }

  /**
   * Remove a single image by hex id (short or long).
   *
   * @param {String} id hex id for the image
   * @return {Promise<null,Error>} promise that resolves after the image has been removed
   */
  removeSingleImage(id) {
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
}

export default ImageRemover;