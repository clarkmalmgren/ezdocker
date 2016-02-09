import Log from './log';
import Pledge from './pledge';
import stream_parser from './stream-parser';

/**
 * Builder pattern for removing images. Note that tags are not required (and ignored).
 */
class ImagePusher extends Pledge {

  constructor(docker, repositoryName) {
    super();

    this._docker = docker;
    this._repositoryName = repositoryName;
  }

  start(resolve, reject) {
    this._docker.getImage(this._repositoryName).push({}, (error, response) => {
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
  }

}

export default ImagePusher;